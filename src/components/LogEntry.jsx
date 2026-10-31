/**
 * EXIMIA CODE · Registro de la bitácora (desplegable)
 * Formato documental del TP1: número, fecha, título, responsable, bloques problema → análisis →
 * decisión → resultado y recuadro del Pull Request. El detalle sólo se dibuja al abrirlo
 * (carga diferida del contenido). `open` y `onToggle` los controla la página (expandir/contraer todo).
 */
import Icon from './Icon.jsx';
import RichText from './RichText.jsx';

export default function LogEntry({ entry, open, onToggle }) {
  const bodyId = `log-${entry.id}`;
  return (
    <article className={`stage-card log-entry${open ? ' is-open' : ''}`}>
      <h3 className="log-heading">
        <button className="log-toggle" type="button" aria-expanded={open} aria-controls={bodyId} onClick={() => onToggle(entry.id)}>
          <span className="stage-number">{String(entry.numero).padStart(2, '0')}</span>
          <span className="log-head">
            <span className="stage-date">{entry.fecha} · {entry.etapa}</span>
            <span className="log-title">{entry.titulo}</span>
            <span className="log-types">
              {entry.tipos.map((tipo) => <span key={tipo} className="log-type">[ {tipo} ]</span>)}
            </span>
          </span>
          <Icon name="chevron" />
        </button>
      </h3>
      {open && (
        <div id={bodyId} className="log-body">
          <p className="stage-owner"><strong>Responsable:</strong> {entry.responsable}</p>
          <div className="stage-grid">
            {entry.bloques.map((block) => (
              <div key={block.titulo}>
                <h4>{block.titulo}</h4>
                <p><RichText text={block.texto} /></p>
              </div>
            ))}
          </div>
          <p className="log-tags">{entry.etiquetas.map((tag) => <span key={tag} className="badge">#{tag}</span>)}</p>
          {entry.pr && (
            <div className="pr-box">
              <strong>{entry.pr.numero ? `Pull Request #${entry.pr.numero}` : `Pull Request · ${entry.pr.rama}`}</strong>
              <h4>{entry.pr.titulo}</h4>
              <p>Descripción: {entry.pr.descripcion}</p>
              <a href={entry.pr.url} target="_blank" rel="noopener noreferrer">{entry.pr.numero ? `Ver Pull Request #${entry.pr.numero}` : 'Ver Pull Requests del repositorio'} ↗</a>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
