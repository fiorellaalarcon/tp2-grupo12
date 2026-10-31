/**
 * EXIMIA CODE · Bitácora (TP1 + TP2)
 * Formato documental del TP1 (jerarquías, línea de tiempo, decisiones, problemas, soluciones, evidencias
 * y navegación interna) con mejoras de React:
 *  - Registros desplegables con búsqueda, filtros por etapa / tipo / etiqueta y carga progresiva.
 *  - Commits y Pull Requests ocultos hasta elegir etapa, integrante o tipo (por defecto "Seleccione…").
 * El contenido vive en src/data/bitacora.json; esta página sólo lo filtra y lo dibuja.
 */
import { useId, useMemo, useState } from 'react';
import { Link } from 'react-router';
import bitacora from '../data/bitacora.json';
import AnchorBar from '../components/AnchorBar.jsx';
import LogEntry from '../components/LogEntry.jsx';
import RichText from '../components/RichText.jsx';
import Section from '../components/Section.jsx';
import useCommits from '../hooks/useCommits.js';

const ANCHORS = [
  { id: 'introduccion', label: 'Introducción' },
  { id: 'registro-breve', label: 'Registro breve' },
  { id: 'registros', label: 'Registros' },
  { id: 'commits', label: 'Commits' },
  { id: 'pull-requests', label: 'Pull Requests' },
  { id: 'pruebas', label: 'Pruebas' },
  { id: 'ia', label: 'IA' },
  { id: 'aprendizajes', label: 'Aprendizajes' },
  { id: 'proximos-pasos', label: 'Próximos pasos' }
];

const PAGE_SIZE = 8;
const TIPOS = ['PLANIFICACIÓN', 'DECISIÓN', 'DESARROLLO', 'PROBLEMA', 'PRUEBA'];
const ETAPAS = [{ value: '', label: 'Todas' }, { value: 'TP1', label: 'Etapa 1 · TP1' }, { value: 'TP2', label: 'Etapa 2 · TP2' }];
const PERSONAS = ['Fiorella Alarcón', 'Axel Alva', 'Malena Jasque', 'Javier Churquina', 'Selene Pais'];
const TAGS = [...new Set(bitacora.registros.flatMap((r) => r.etiquetas))].sort((a, b) => a.localeCompare(b, 'es'));
const normalize = (text) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

/* Selector de etapa reutilizable (TP1 / TP2) para las secciones de resumen. */
function StageTabs({ value, onChange, label }) {
  return (
    <div className="stage-tabs" role="group" aria-label={label}>
      {['TP1', 'TP2'].map((etapa) => (
        <button key={etapa} type="button" className={value === etapa ? 'chip is-active' : 'chip'} aria-pressed={value === etapa} onClick={() => onChange(etapa)}>{etapa}</button>
      ))}
    </div>
  );
}

export default function Bitacora() {
  const uid = useId();
  const { live, status, load } = useCommits();

  /* --- Estado de los registros --- */
  const [query, setQuery] = useState('');
  const [etapa, setEtapa] = useState('');
  const [tipo, setTipo] = useState('');
  const [tag, setTag] = useState('');
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [openIds, setOpenIds] = useState(() => new Set());

  /* --- Estado de commits y PR (vacíos por defecto: "Seleccione…") --- */
  const [cEtapa, setCEtapa] = useState('');
  const [cPersona, setCPersona] = useState('');
  const [cTipo, setCTipo] = useState('');
  const [pEtapa, setPEtapa] = useState('');

  /* --- Estado de las secciones de resumen --- */
  const [resumenEtapa, setResumenEtapa] = useState('TP2');

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return bitacora.registros.filter((r) => {
      const text = normalize(`${r.titulo} ${r.responsable} ${r.etiquetas.join(' ')} ${r.bloques.map((b) => b.texto).join(' ')}`);
      return (!q || text.includes(q)) && (!etapa || r.etapa === etapa) && (!tipo || r.tipos.includes(tipo)) && (!tag || r.etiquetas.includes(tag));
    });
  }, [query, etapa, tipo, tag]);

  const hasFilters = query || etapa || tipo || tag;
  const shown = filtered.slice(0, visible);
  const resetRegistros = () => { setQuery(''); setEtapa(''); setTipo(''); setTag(''); setVisible(PAGE_SIZE); };
  /* Cualquier cambio de filtro vuelve a la primera tanda. */
  const withReset = (setter) => (value) => { setter(value); setVisible(PAGE_SIZE); };
  const toggleOne = (id) => setOpenIds((current) => { const next = new Set(current); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  const allShownOpen = shown.length > 0 && shown.every((r) => openIds.has(r.id));
  const toggleAll = () => setOpenIds(allShownOpen ? new Set() : new Set(shown.map((r) => r.id)));

  /* --- Commits: la instantánea se reemplaza por el historial real si se actualizó desde GitHub --- */
  const allCommits = useMemo(() => bitacora.commits.filter((c) => !live[c.etapa]).concat(Object.values(live).flat()), [live]);
  const commitsActive = cEtapa || cPersona || cTipo;
  const commits = commitsActive ? allCommits.filter((c) => (!cEtapa || c.etapa === cEtapa) && (!cPersona || c.persona === cPersona) && (!cTipo || c.tipo === cTipo)) : [];
  const commitTipos = [...new Set(allCommits.map((c) => c.tipo))].sort((a, b) => a.localeCompare(b, 'es'));
  const prs = pEtapa ? bitacora.prs.filter((p) => !pEtapa || p.etapa === pEtapa) : [];

  return (
    <>
      <title>Bitácora · Eximia Code</title>
      <meta name="description" content="Bitácora de desarrollo del Grupo 12: decisiones, problemas, soluciones, commits y Pull Requests del TP1 y el TP2." />

      {/* INTRODUCCIÓN: establece el método documental que se repite en cada etapa. */}
      <section id="introduccion" className="section bitacora-hero" aria-labelledby="bitacora-titulo">
        <div className="container">
          <span className="eyebrow">Proceso · Grupo 12 · TP1 y TP2</span>
          <h1 id="bitacora-titulo" tabIndex={-1}>Bitácora de desarrollo</h1>
          <p className="lead">Investigación → decisión → implementación → dificultad → solución → prueba → integración → aprendizaje.</p>
          <div className="bitacora-summary" aria-label="Resumen del proceso del TP2">
            <article><span className="summary-label">25–29/10</span><strong>Investigación y planificación</strong><p>Se definieron stack, versiones, navegación, datos, formulario, API, árbol y plan de ramas.</p></article>
            <article><span className="summary-label">30/10</span><strong>Implementación</strong><p>Cinco ramas, una por integrante, integradas por Pull Requests en orden de dependencias.</p></article>
            <article><span className="summary-label">Cierre</span><strong>Prueba + integración</strong><p>Revisión de los 15 criterios, de todas las rutas y de la publicación en Vercel.</p></article>
          </div>
        </div>
      </section>

      <AnchorBar items={ANCHORS} label="Navegación interna de la bitácora" />

      {/* REGISTRO BREVE: lectura rápida; se puede alternar entre etapas. */}
      <Section id="registro-breve" eyebrow="Registro breve del proceso" title="Qué hicimos, qué decidimos y qué resolvimos" intro="Resumen de lectura rápida de cada etapa.">
        <StageTabs value={resumenEtapa} onChange={setResumenEtapa} label="Etapa del resumen" />
        <ol className="timeline">
          {bitacora.resumen[resumenEtapa].map((item) => (
            <li key={item.titulo}><article><h3>{item.titulo}</h3><p><RichText text={item.texto} /></p></article></li>
          ))}
        </ol>
      </Section>

      {/* REGISTROS: búsqueda + filtros + desplegables */}
      <Section id="registros" alt eyebrow="Trazabilidad" title="Registros del proceso" intro="Buscá por texto o filtrá por etapa, tipo de registro y etiqueta.">
        <form className="log-filters" role="search" aria-label="Filtros de los registros" onSubmit={(e) => e.preventDefault()}>
          <div className="field">
            <label htmlFor={`${uid}-q`}>Buscar</label>
            <input id={`${uid}-q`} type="search" value={query} onChange={(e) => withReset(setQuery)(e.target.value)} placeholder="Título, persona, tema…" autoComplete="off" />
          </div>
          <div className="field">
            <label htmlFor={`${uid}-tag`}>Etiqueta</label>
            <select id={`${uid}-tag`} value={tag} onChange={(e) => withReset(setTag)(e.target.value)}>
              <option value="">Todas las etiquetas</option>
              {TAGS.map((t) => <option key={t} value={t}>#{t}</option>)}
            </select>
          </div>
          <fieldset className="chip-group">
            <legend>Etapa</legend>
            {ETAPAS.map((e) => <button key={e.label} type="button" className={etapa === e.value ? 'chip is-active' : 'chip'} aria-pressed={etapa === e.value} onClick={() => withReset(setEtapa)(e.value)}>{e.label}</button>)}
          </fieldset>
          <fieldset className="chip-group">
            <legend>Tipo de registro</legend>
            <button type="button" className={tipo === '' ? 'chip is-active' : 'chip'} aria-pressed={tipo === ''} onClick={() => withReset(setTipo)('')}>Todos</button>
            {TIPOS.map((t) => <button key={t} type="button" className={tipo === t ? 'chip is-active' : 'chip'} aria-pressed={tipo === t} onClick={() => withReset(setTipo)(t)}>[ {t} ]</button>)}
          </fieldset>
          <div className="log-actions">
            <button className="btn btn-secondary" type="button" onClick={resetRegistros} disabled={!hasFilters}>Restablecer</button>
            <button className="btn btn-secondary" type="button" onClick={toggleAll} disabled={shown.length === 0}>{allShownOpen ? 'Contraer todos' : 'Expandir los visibles'}</button>
          </div>
        </form>

        <p className="log-count" role="status" aria-live="polite">
          {filtered.length === bitacora.registros.length ? `Mostrando ${shown.length} de ${filtered.length} registros.` : `${filtered.length} registros coinciden · mostrando ${shown.length}.`}
        </p>

        {shown.length > 0 ? (
          <div className="stage-stack">
            {shown.map((entry) => <LogEntry key={entry.id} entry={entry} open={openIds.has(entry.id)} onToggle={toggleOne} />)}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No hay registros con esos criterios</h3>
            <button className="btn btn-primary" type="button" onClick={resetRegistros}>Restablecer y ver todos</button>
          </div>
        )}
        {filtered.length > visible && (
          <p className="load-more"><button className="btn btn-primary" type="button" onClick={() => setVisible((n) => n + PAGE_SIZE)}>Mostrar más ({filtered.length - visible} restantes)</button></p>
        )}
      </Section>

      {/* COMMITS: ocultos hasta elegir un filtro */}
      <Section id="commits" eyebrow="Evidencia" title="Historial de commits" intro="Elegí etapa, integrante o tipo para ver los commits. Cada uno es desplegable.">
        <form className="log-filters" aria-label="Filtros del historial de commits" onSubmit={(e) => e.preventDefault()}>
          <div className="field">
            <label htmlFor={`${uid}-ce`}>Etapa</label>
            <select id={`${uid}-ce`} value={cEtapa} onChange={(e) => setCEtapa(e.target.value)}>
              <option value="">Seleccione etapa</option><option value="TP1">TP1</option><option value="TP2">TP2</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor={`${uid}-cp`}>Integrante</label>
            <select id={`${uid}-cp`} value={cPersona} onChange={(e) => setCPersona(e.target.value)}>
              <option value="">Seleccione miembro</option>{PERSONAS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor={`${uid}-ct`}>Tipo de commit</label>
            <select id={`${uid}-ct`} value={cTipo} onChange={(e) => setCTipo(e.target.value)}>
              <option value="">Seleccione tipo de commit</option>{commitTipos.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="log-actions">
            <button className="btn btn-secondary" type="button" onClick={() => { setCEtapa(''); setCPersona(''); setCTipo(''); }} disabled={!commitsActive}>Restablecer</button>
            <button className="btn btn-secondary" type="button" onClick={() => load(cEtapa)} disabled={!cEtapa || status[cEtapa] === 'loading'}>
              {status[cEtapa] === 'loading' ? 'Consultando GitHub…' : 'Actualizar desde GitHub'}
            </button>
          </div>
        </form>
        <p className="log-source" role="status" aria-live="polite">
          {!cEtapa && 'Instantánea documental del historial. Elegí una etapa para poder actualizarla desde GitHub.'}
          {cEtapa && !status[cEtapa] && (cEtapa === 'TP2' ? 'TP2: se muestra el plan de commits acordado hasta que se actualice con el historial real del repositorio.' : 'TP1: instantánea documental; podés actualizarla desde GitHub.')}
          {status[cEtapa] === 'ok' && `Historial real de ${cEtapa} cargado desde GitHub.`}
          {status[cEtapa] === 'error' && `No se pudo leer GitHub para ${cEtapa}; se conserva la instantánea.`}
        </p>
        {commitsActive ? (
          <div className="commit-history" aria-live="polite">
            <p className="log-count">{commits.length} commits.</p>
            {commits.map((c) => (
              <details key={`${c.etapa}-${c.sha ?? c.titulo}`} className="commit-card">
                <summary><span className="commit-meta">{c.fecha} · {c.persona} · {c.tipo} · {c.etapa}</span><strong>{c.sha ? `${c.sha} · ` : ''}{c.titulo}</strong></summary>
                <p><strong>Título:</strong> {c.titulo}</p>
                <p><strong>Descripción:</strong> {c.descripcion}</p>
                <a href={c.url} target="_blank" rel="noopener noreferrer">{c.sha ? 'Abrir commit' : `Ver commits de ${c.rama}`} ↗</a>
              </details>
            ))}
            {commits.length === 0 && <div className="empty-state"><p>No hay commits con esa combinación.</p></div>}
          </div>
        ) : (
          <div className="empty-state"><p>Seleccione etapa, miembro o tipo de commit para mostrar el historial.</p></div>
        )}
      </Section>

      <Section id="pull-requests" alt eyebrow="Integración" title="Pull Requests del proceso">
        <div className="field pr-select">
          <label htmlFor={`${uid}-pe`}>Etapa</label>
          <select id={`${uid}-pe`} value={pEtapa} onChange={(e) => setPEtapa(e.target.value)}>
            <option value="">Seleccione etapa</option><option value="TP1">TP1</option><option value="TP2">TP2</option>
          </select>
        </div>
        {pEtapa ? (
          <div className="pr-history">
            {prs.map((p) => (
              <article key={`${p.etapa}-${p.titulo}`} className="pr-history-card">
                <span>{p.numero ? `PR #${p.numero}` : `PR · ${p.etapa}`}</span>
                <h3>{p.titulo}</h3>
                <p><strong>Responsable:</strong> {p.responsable}</p>
                <p><strong>Descripción:</strong> {p.descripcion}</p>
                <a href={p.url} target="_blank" rel="noopener noreferrer">{p.numero ? `Abrir PR #${p.numero}` : 'Abrir Pull Requests'} ↗</a>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state"><p>Seleccione una etapa para ver sus Pull Requests.</p></div>
        )}
        <div className="process-note"><strong>Cómo comprobarlo:</strong> al abrir un Pull Request en GitHub se puede consultar su título y descripción, la rama de origen, los cambios y la integración.</div>
      </Section>

      <Section id="pruebas" eyebrow="Verificación" title="Pruebas realizadas">
        <StageTabs value={resumenEtapa} onChange={setResumenEtapa} label="Etapa de las pruebas" />
        <ul className="checklist">
          {bitacora.pruebas[resumenEtapa].map((item) => (
            <li key={item.texto} className="check">{item.hecho ? '✓' : '☐'} <RichText text={item.texto} />{!item.hecho && <span className="muted"> (a confirmar por el equipo antes de entregar)</span>}</li>
          ))}
        </ul>
      </Section>

      <Section id="ia" alt eyebrow="IA y autoría" title="Uso responsable de herramientas de IA">
        <div className="ai-process">
          <article><span>1</span><h3>Generación</h3><p>La IA se usó como apoyo técnico y creativo para explorar alternativas de código, diseño y documentación.</p></article>
          <article><span>2</span><h3>Selección</h3><p>El equipo evaluó cada propuesta según identidad, legibilidad, utilidad y compatibilidad de versiones.</p></article>
          <article><span>3</span><h3>Adaptación</h3><p>Se modificó, probó y adaptó el resultado al proyecto real y a la rúbrica.</p></article>
          <article><span>4</span><h3>Autoría</h3><p>Decisión final, revisión, pruebas y documentación corresponden al equipo.</p></article>
        </div>
        <div className="decision-box"><strong>Declaración completa</strong><p>La aplicación y el modelo utilizados por cada integrante están en el <code>README.md</code> del repositorio. Los prompts de imágenes del TP1 están en <code>docs/IA-PROMPTS.md</code>.</p></div>
      </Section>

      <Section id="aprendizajes" eyebrow="Cierre" title="Qué aprendimos">
        <StageTabs value={resumenEtapa} onChange={setResumenEtapa} label="Etapa de los aprendizajes" />
        <div className="narrow-content">
          {bitacora.aprendizajes[resumenEtapa].map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <div className="closing-statement"><strong>La Bitácora registra el camino además del resultado.</strong><span>Investigación → decisión → implementación → dificultad → solución → prueba → integración → aprendizaje.</span></div>
      </Section>

      <Section id="proximos-pasos" alt eyebrow="Próximo desafío" title="Próximos pasos">
        <div className="continuity-grid">
          {bitacora.proximos.map((item) => <article key={item.titulo}><h3>{item.titulo}</h3><p><RichText text={item.texto} /></p></article>)}
        </div>
        <nav className="profile-nav bitacora-final-nav" aria-label="Navegación de la bitácora">
          <Link className="card-link" to="/equipo">Ver equipo</Link>
          <Link className="card-link" to="/">Inicio</Link>
          <a className="card-link" href="#introduccion" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); }}>Volver arriba</a>
        </nav>
      </Section>
    </>
  );
}
