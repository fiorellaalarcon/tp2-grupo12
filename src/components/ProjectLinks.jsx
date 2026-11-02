/**
 * EXIMIA CODE · Accesos «Recorré el proyecto»
 * Muestra una tarjeta clickeable por cada sección técnica de la aplicación.
 * Los datos llegan por la prop `links` (por defecto, la lista de abajo) y se dibujan con .map():
 * agregar una sección nueva es agregar un objeto, no copiar JSX.
 * Cada tarjeta es un único <Link> del router: no recarga la página y se usa con mouse, teclado o toque.
 */
import { Link } from 'react-router';
import Icon from './Icon.jsx';

const PROJECT_LINKS = [
  { to: '/recursos', icon: 'database', title: 'Recursos JSON', text: 'Explorá el catálogo local, buscá y filtrá sus registros.' },
  { to: '/api', icon: 'cloud', title: 'API pública', text: 'Conocé los datos consultados y sus estados de carga.' },
  { to: '/arbol', icon: 'tree', title: 'Árbol de renderizado', text: 'Recorré la jerarquía de componentes de React.' },
  { to: '/bitacora', icon: 'book', title: 'Bitácora', text: 'Seguí las decisiones, dificultades y avances del equipo.' }
];

export default function ProjectLinks({ links = PROJECT_LINKS }) {
  return (
    <div className="project-links-grid">
      {links.map((item) => (
        <Link key={item.to} className="project-link-card" to={item.to}>
          <Icon name={item.icon} size={25} />
          <span>
            <strong>{item.title}</strong>
            <small>{item.text}</small>
          </span>
          {/* La flecha es decorativa: el significado lo da el texto del enlace. */}
          <span className="project-link-arrow" aria-hidden="true">↗</span>
        </Link>
      ))}
    </div>
  );
}
