/**
 * EXIMIA CODE · Anchor bar sticky con indicador de sección activa
 * Va debajo del header (position: sticky). Recibe `items` por props: [{ id, label }].
 * El enlace de la sección visible lleva aria-current="location" (además del color, se subraya).
 */
import useScrollSpy from '../hooks/useScrollSpy.js';
import useMediaQuery from '../hooks/useMediaQuery.js';

export default function AnchorBar({ items, label = 'Navegación interna de la página' }) {
  const activeId = useScrollSpy(items.map((item) => item.id));
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  /* Desplaza suavemente (o sin animación si el usuario lo prefiere) y actualiza el hash de la URL. */
  function goTo(event, id) {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(null, '', `#${id}`);
  }

  return (
    <nav className="anchor-bar" aria-label={label}>
      <div className="container">
        <ul className="anchor-list">
          {items.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} onClick={(event) => goTo(event, item.id)} aria-current={activeId === item.id ? 'location' : undefined} className={activeId === item.id ? 'is-active' : undefined}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
