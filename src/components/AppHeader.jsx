/**
 * EXIMIA CODE · Header compartido
 * Muestra dónde está la persona (migas de pan), el botón hamburguesa en móvil y el selector de tema.
 * `buttonRef` llega como prop común: en React 19 los componentes función reciben `ref` sin forwardRef.
 */
import { Link, useLocation } from 'react-router';
import members from '../data/members.json';
import Icon from './Icon.jsx';
import ThemeToggle from './ThemeToggle.jsx';

const LABELS = {
  '/': 'Inicio',
  '/equipo': 'Equipo',
  '/recursos': 'Recursos JSON',
  '/api': 'API pública',
  '/arbol': 'Árbol de renderizado',
  '/bitacora': 'Bitácora',
  '/contacto': 'Contacto'
};

/* Devuelve la lista de migas para la URL actual. */
function buildCrumbs(pathname) {
  const clean = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;
  if (LABELS[clean]) {
    return clean === '/' ? [{ label: 'Inicio' }] : [{ label: 'Inicio', to: '/' }, { label: LABELS[clean] }];
  }
  const match = clean.match(/^\/equipo\/([^/]+)$/);
  const member = match && members.find((m) => m.slug === match[1]);
  if (member) {
    return [{ label: 'Inicio', to: '/' }, { label: 'Equipo', to: '/equipo' }, { label: member.nombre }];
  }
  return [{ label: 'Inicio', to: '/' }, { label: 'Página no encontrada' }];
}

export default function AppHeader({ menuOpen, onMenuToggle, buttonRef }) {
  const { pathname } = useLocation();
  const crumbs = buildCrumbs(pathname);

  return (
    <header className="app-header">
      {/* HAMBURGUESA: sólo visible ≤ 900 px. aria-expanded + aria-controls informan el estado. */}
      <button
        ref={buttonRef}
        className="menu-toggle"
        type="button"
        onClick={onMenuToggle}
        aria-expanded={menuOpen}
        aria-controls="sidebar"
        aria-label={menuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
      >
        <Icon name={menuOpen ? 'close' : 'menu'} />
      </button>

      <nav className="breadcrumb" aria-label="Ruta de navegación">
        <ol>
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1;
            return (
              <li key={crumb.label}>
                {isLast ? <span aria-current="page">{crumb.label}</span> : <Link to={crumb.to}>{crumb.label}</Link>}
              </li>
            );
          })}
        </ol>
      </nav>

      <ThemeToggle />
    </header>
  );
}
