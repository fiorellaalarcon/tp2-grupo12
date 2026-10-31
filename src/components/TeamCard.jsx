/**
 * EXIMIA CODE · Tarjeta de integrante (totalmente clickeable)
 * Toda la tarjeta es UN solo enlace al perfil interno: evita paradas de Tab redundantes y
 * agranda el área táctil. "Ver perfil →" es texto del mismo enlace, no otro destino.
 * Imagen: avatar de 400 px (srcSet) con width/height para evitar saltos de layout (CLS).
 */
import { Link } from 'react-router';

export default function TeamCard({ member }) {
  return (
    <article className="team-card">
      <Link className="team-card-profile-link" to={`/equipo/${member.slug}`} aria-label={`Ver perfil de ${member.nombre}`}>
        <img src={`/img/${member.avatar400}`} alt={member.avatarAlt} width="400" height="400" loading="lazy" decoding="async" />
        <div className="team-card-body">
          <span className="role">{member.rol}</span>
          <h3>{member.nombre}</h3>
          <p className="muted">{member.ciudad} · {member.edad} años</p>
          <span className="card-profile-label">Ver perfil →</span>
        </div>
      </Link>
    </article>
  );
}
