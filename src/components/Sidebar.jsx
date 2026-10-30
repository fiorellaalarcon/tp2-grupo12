/**
 * EXIMIA CODE · Sidebar compartida
 * Estructura pedida por la consigna: identidad del equipo, enlaces y sección activa.
 * - <NavLink> agrega aria-current="page" y la clase "active" al enlace de la ruta actual.
 * - Los 5 integrantes salen de members.json (.map): no se copian a mano.
 * - En móvil (≤ 900 px) funciona como panel deslizable; RootLayout controla apertura, Esc y foco.
 * - `onClose` cierra con el botón ✕ (devuelve el foco al hamburguesa); `onNavigate` cierra al elegir una página.
 */
import { Link, NavLink } from 'react-router';
import members from '../data/members.json';
import Icon from './Icon.jsx';

/* Enlace de la sidebar: ícono + texto. `onNavigate` cierra el panel móvil al elegir una página. */
function SideLink({ to, icon, end = false, onNavigate, children }) {
  return (
    <NavLink to={to} end={end} onClick={onNavigate} className={({ isActive }) => (isActive ? 'side-link active' : 'side-link')}>
      <Icon name={icon} size={18} />
      <span>{children}</span>
    </NavLink>
  );
}

export default function Sidebar({ isOpen, onClose, onNavigate }) {
  return (
    <aside id="sidebar" className={isOpen ? 'sidebar is-open' : 'sidebar'} aria-label="Barra lateral del sitio">
      {/* IDENTIDAD: logo + nombre de marca (Orbitron). Es el botón de reinicio hacia el Inicio. */}
      <div className="sidebar-head">
        <Link className="brand-link" to="/" onClick={onNavigate} aria-label="Eximia Code, ir al inicio">
          <img className="logo-img" src="/img/logo-96.webp" width="44" height="44" alt="" decoding="async" />
          <span className="brand-name">Eximia Code</span>
        </Link>
        <button className="sidebar-close" type="button" onClick={onClose} aria-label="Cerrar menú móvil" title="Disponible cuando el menú se abre en pantallas pequeñas">
          <Icon name="close" />
        </button>
      </div>
      <p className="sidebar-subtitle">Grupo 12 – FrontEnd TP2</p>

      <nav aria-label="Navegación principal">
        <ul className="side-list">
          <li><SideLink to="/" end icon="home" onNavigate={onNavigate}>Inicio</SideLink></li>
          <li>
            <SideLink to="/equipo" end icon="users" onNavigate={onNavigate}>Equipo</SideLink>
            {/* ACCESO DIRECTO a cada perfil desde cualquier pantalla (no depende del botón Atrás). */}
            <ul className="side-sublist" aria-label="Perfiles del equipo">
              {members.map((member) => (
                <li key={member.id}>
                  <SideLink to={`/equipo/${member.slug}`} icon="user" onNavigate={onNavigate}>{member.nombre}</SideLink>
                </li>
              ))}
            </ul>
          </li>
          <li><SideLink to="/recursos" icon="database" onNavigate={onNavigate}>Recursos JSON</SideLink></li>
          <li><SideLink to="/api" icon="cloud" onNavigate={onNavigate}>API pública</SideLink></li>
          <li><SideLink to="/arbol" icon="tree" onNavigate={onNavigate}>Árbol de renderizado</SideLink></li>
          <li><SideLink to="/bitacora" icon="book" onNavigate={onNavigate}>Bitácora</SideLink></li>
          <li><SideLink to="/contacto" icon="mail" onNavigate={onNavigate}>Contacto</SideLink></li>
        </ul>
      </nav>

      <p className="sidebar-foot">© 2026 · IFTS 29 · Desarrollo de Sistemas Web (Front End)</p>
    </aside>
  );
}
