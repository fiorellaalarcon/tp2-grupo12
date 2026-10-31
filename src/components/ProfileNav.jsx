/**
 * EXIMIA CODE · Navegación entre perfiles: anterior / inicio / siguiente (circular)
 * Sirve para recorrer en orden; las tarjetas "resto del equipo" sirven para elegir directamente.
 */
import { Link } from 'react-router';
import members from '../data/members.json';

export default function ProfileNav({ index }) {
  const prev = members[(index - 1 + members.length) % members.length];
  const next = members[(index + 1) % members.length];
  return (
    <nav className="profile-nav" aria-label="Navegación entre perfiles">
      <Link className="card-link" to={`/equipo/${prev.slug}`} aria-label={`Perfil anterior: ${prev.nombre}`}>‹ Anterior</Link>
      <Link className="card-link" to="/">Inicio</Link>
      <Link className="card-link" to={`/equipo/${next.slug}`} aria-label={`Perfil siguiente: ${next.nombre}`}>Siguiente ›</Link>
    </nav>
  );
}
