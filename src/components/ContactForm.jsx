/**
 * EXIMIA CODE · Formulario de contacto ÚNICO (migrado de js/forms.js)
 * - Validación accesible: aria-invalid + mensajes con aria-describedby, al salir del campo y al enviar.
 * - Envío AJAX con fetch a FormSubmit (JSON + Accept: application/json): sin recargar ni salir del sitio.
 * - `para` identifica a la persona destinataria (viene de /contacto?para=slug desde un perfil).
 * - Sin librerías de validación (Yup/Zod): son 4 campos; las reglas propias pesan menos y se explican mejor.
 * Estado: useState (valores, errores, resultado). useId (ids únicos). useRef (foco en el resultado).
 */
import { useId, useRef, useState } from 'react';
import members from '../data/members.json';

const ENDPOINT = 'https://formsubmit.co/ajax/alarconfiorellamelina@gmail.com';
const MIN = { nombre: 3, asunto: 3, mensaje: 10 }; // largos mínimos, como en el TP1
const EMPTY = { nombre: '', email: '', asunto: '', mensaje: '' };

/* Devuelve el mensaje de error de un campo, o '' si es válido. */
function validate(name, value) {
  const text = value.trim();
  if (!text) return 'Este campo es obligatorio.';
  if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(text)) return 'Ingresá un correo electrónico válido.';
  if (MIN[name] && text.length < MIN[name]) return `Ingresá al menos ${MIN[name]} caracteres.`;
  return '';
}

export default function ContactForm({ para, onParaChange }) {
  const uid = useId();
  const statusRef = useRef(null);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  const fieldId = (name) => `${uid}-${name}`;
  const target = members.find((m) => m.slug === para);
  const targetLabel = target ? target.nombre : 'Todo el equipo (consulta general)';

  /* Feedback temprano: se valida al salir del campo y, si ya había error, mientras se escribe. */
  function handleBlur(name) {
    setErrors((current) => ({ ...current, [name]: validate(name, values[name]) }));
  }
  function handleChange(name, value) {
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: validate(name, value) }));
  }

  /* Muestra el resultado y mueve el foco allí para que se perciba con teclado y lector de pantalla. */
  function announce(type, message) {
    setStatus({ type, message });
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  async function handleSubmit(event) {
    /* preventDefault evita la redirección y permite anunciar el resultado dentro del sitio. */
    event.preventDefault();
    const found = Object.fromEntries(Object.keys(EMPTY).map((name) => [name, validate(name, values[name])]));
    setErrors(found);
    const firstInvalid = Object.keys(found).find((name) => found[name]);
    if (firstInvalid) {
      announce('error', 'Revisá los campos indicados antes de enviar.');
      document.getElementById(fieldId(firstInvalid))?.focus();
      return;
    }

    setStatus({ type: 'sending', message: 'Enviando mensaje…' });
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...values,
          destinatario: targetLabel,
          _subject: `Consulta desde Eximia Code · ${target ? `para ${target.nombre}` : 'Grupo 12'}`,
          _captcha: 'false',
          _template: 'table'
        })
      });
      let data = null;
      try {
        data = await response.json();
      } catch {
        /* Un error HTTP ya es suficiente para rechazar; el parseo sólo aporta información extra. */
      }
      if (!response.ok || (data && data.success === 'false')) throw new Error('El servicio respondió con error.');
      setValues(EMPTY);
      setErrors({});
      announce('success', target ? `Mensaje enviado correctamente. ¡Gracias por escribirle a ${target.nombre}!` : 'Mensaje enviado correctamente. ¡Gracias por contactarnos!');
    } catch {
      /* Si falla la red o FormSubmit se informa el problema sin fingir un envío exitoso. */
      announce('error', 'No pudimos enviar el mensaje. Verificá tu conexión e intentá nuevamente.');
    }
  }

  /* Campo reutilizable: label explícita + error enlazado con aria-describedby.
     Se llama como FUNCIÓN ({renderField({...})}) y no como <Field />: un componente definido dentro de otro
     se vuelve a crear en cada render y el input perdería el foco en cada tecla. */
  function renderField({ name, label, type = 'text', autoComplete, full = false, area = false }) {
    const Tag = area ? 'textarea' : 'input';
    return (
      <div className={full ? 'field full' : 'field'} key={name}>
        <label htmlFor={fieldId(name)}>{label}</label>
        <Tag
          id={fieldId(name)}
          name={name}
          type={area ? undefined : type}
          autoComplete={autoComplete}
          value={values[name]}
          onChange={(e) => handleChange(name, e.target.value)}
          onBlur={() => handleBlur(name)}
          aria-invalid={errors[name] ? 'true' : 'false'}
          aria-describedby={`${fieldId(name)}-error`}
          disabled={status.type === 'sending'}
          required
        />
        <p className="form-error" id={`${fieldId(name)}-error`} aria-live="polite">{errors[name]}</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate aria-describedby={`${uid}-help`}>
      <p className="form-help" id={`${uid}-help`}>Todos los campos son obligatorios. El mensaje debe tener al menos 10 caracteres.</p>
      <div className="form-grid">
        {/* DESTINATARIO: identifica a la persona cuando se llega desde un perfil. */}
        <div className="field full">
          <label htmlFor={fieldId('para')}>¿A quién querés escribirle?</label>
          <select id={fieldId('para')} value={para} onChange={(e) => onParaChange(e.target.value)} disabled={status.type === 'sending'}>
            <option value="equipo">Todo el equipo (consulta general)</option>
            {members.map((m) => <option key={m.id} value={m.slug}>{m.nombre} · {m.rol}</option>)}
          </select>
        </div>
        {renderField({ name: 'nombre', label: 'Nombre completo', autoComplete: 'name' })}
        {renderField({ name: 'email', label: 'Email', type: 'email', autoComplete: 'email' })}
        {renderField({ name: 'asunto', label: 'Asunto', full: true })}
        {renderField({ name: 'mensaje', label: 'Mensaje', full: true, area: true })}
        <div className="field full">
          <button className="btn btn-primary" type="submit" disabled={status.type === 'sending'} aria-busy={status.type === 'sending'}>
            {status.type === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
          </button>
          <p ref={statusRef} className={`form-status ${status.type === 'success' ? 'success' : status.type === 'error' ? 'error' : ''}`} role={status.type === 'error' ? 'alert' : 'status'} aria-live="polite" tabIndex={-1}>{status.message}</p>
        </div>
      </div>
    </form>
  );
}
