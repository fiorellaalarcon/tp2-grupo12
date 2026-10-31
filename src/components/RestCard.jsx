/**
 * EXIMIA CODE · Tarjeta compacta "resto del equipo" (un único enlace al perfil)
 */
import { Link } from 'react-router';

export default function RestCard({ member }) {
  return (
    <Link className="rest-card" to={`/equipo/${member.slug}`}>
      <img src={`/img/${member.avatar400}`} alt={`Avatar de ${member.nombre}`} width="400" height="400" loading="lazy" decoding="async" />
      <h3>{member.nombre}</h3>
      <span className="role">{member.rol}</span>
    </Link>
  );
}
