/**
 * EXIMIA CODE · Pie compartido
 * Navegación secundaria, tecnologías y "Volver arriba" (respeta prefers-reduced-motion).
 */
import { Link } from 'react-router';
import useMediaQuery from '../hooks/useMediaQuery.js';

export default function Footer() {
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  /* "Volver arriba" desplaza al inicio y deja el foco en un control visible del encabezado. */
  function scrollTop() {
    window.scrollTo({ top: 0, left: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    document.querySelector('.menu-toggle, .theme-toggle')?.focus({ preventScroll: true });
  }

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <strong>TP2 · Grupo 12 · Eximia Code</strong>
          <div className="muted">© 2026 · Desarrollo web frontend · React + Vite</div>
        </div>
        <nav className="footer-links" aria-label="Navegación del pie">
          <Link to="/">Inicio</Link>
          <Link to="/equipo">Equipo</Link>
          <Link to="/recursos">Recursos JSON</Link>
          <Link to="/api">API pública</Link>
          <Link to="/arbol">Árbol de renderizado</Link>
          <Link to="/bitacora">Bitácora</Link>
          <Link to="/contacto">Contacto</Link>
        </nav>
        <div className="tech-badges">
          <span className="badge">React 19.3</span>
          <span className="badge">React Router 8</span>
          <span className="badge">Vite 8</span>
        </div>
        <button className="footer-skip" type="button" onClick={scrollTop}>Volver arriba ↑</button>
      </div>
    </footer>
  );
}
