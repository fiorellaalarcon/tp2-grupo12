/**
 * EXIMIA CODE · Contacto (formulario único)
 * Lee ?para=slug con useSearchParams: así la identificación del integrante sobrevive a una
 * recarga y se puede compartir el enlace (a diferencia de pasarla por `state` del router).
 */
import { Link, useSearchParams } from 'react-router';
import members from '../data/members.json';
import AnchorBar from '../components/AnchorBar.jsx';
import ContactForm from '../components/ContactForm.jsx';
import Section from '../components/Section.jsx';
import GithubList from '../components/GithubList.jsx';

const ANCHORS = [
  { id: 'formulario', label: 'Formulario' },
  { id: 'otras-vias', label: 'Otras vías' }
];

export default function Contact() {
  const [params, setParams] = useSearchParams();
  const requested = params.get('para');
  /* Un valor desconocido en la URL se ignora y se usa la consulta general. */
  const para = members.some((m) => m.slug === requested) ? requested : 'equipo';
  const target = members.find((m) => m.slug === para);

  /* Cambiar el selector actualiza la URL (replace: no ensucia el historial). */
  function changePara(value) {
    setParams(value === 'equipo' ? {} : { para: value }, { replace: true });
  }

  return (
    <>
      <title>Contacto · Eximia Code</title>
      <meta name="description" content="Escribile al Grupo 12 de Eximia Code con el formulario único de contacto." />

      <section className="hero page-hero" aria-labelledby="contacto-titulo">
        <div className="container">
          <span className="eyebrow">Contacto</span>
          <h1 id="contacto-titulo" tabIndex={-1}>Hablemos con Eximia Code</h1>
          <p>Enviá tu consulta al Grupo 12. El formulario valida los datos y envía tu mensaje sin recargar ni salir del sitio.</p>
        </div>
      </section>

      <AnchorBar items={ANCHORS} label="Navegación interna de contacto" />

      <Section id="formulario" eyebrow="Formulario" title={target ? `Mensaje para ${target.nombre}` : 'Mensaje para el equipo'}>
        <div className="contact-layout">
          <div>
            <p className="muted">{target ? `Llegaste desde el perfil de ${target.nombre} (${target.rol}). Tu mensaje quedará identificado para esa persona.` : 'Podés escribirle a todo el equipo o elegir a una persona en el selector.'}</p>
            <p><strong>Email de equipo:</strong> <a href="mailto:alarconfiorellamelina@gmail.com">alarconfiorellamelina@gmail.com</a></p>
            <div className="hero-actions">
              <Link className="btn btn-secondary" to="/equipo">Ver el equipo</Link>
              {target && <Link className="btn btn-secondary" to={`/equipo/${target.slug}`}>Volver al perfil</Link>}
            </div>
          </div>
          <div className="contact-card">
            <ContactForm para={para} onParaChange={changePara} />
          </div>
        </div>
      </Section>

      <Section id="otras-vias" alt eyebrow="Más formas de encontrarnos" title="Otras vías">
        <GithubList />
      </Section>
    </>
  );
}
