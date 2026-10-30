/**
 * EXIMIA CODE · Sección reutilizable (props + children)
 * Recibe datos por props (id, eyebrow, title, intro, alt) y el contenido como `children`.
 * Se usa en todas las páginas: un mismo componente con distintos datos (criterio 4 · Propone).
 */
export default function Section({ id, eyebrow, title, intro, alt = false, children }) {
  const titleId = `${id}-titulo`;
  return (
    <section className={alt ? 'section alt' : 'section'} id={id} aria-labelledby={titleId}>
      <div className="container">
        <div className="section-heading">
          <div>
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            <h2 id={titleId}>{title}</h2>
          </div>
          {intro && <p>{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
