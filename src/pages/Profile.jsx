/**
 * EXIMIA CODE · Perfil reutilizable (/equipo/:slug)
 * UNA sola página recibe los datos del integrante desde members.json (useParams + find):
 * se eliminó el código repetido de los 5 HTML del TP1.
 * Orden TP1 conservado: hero (foto a la izquierda) → anchor bar → habilidades → películas
 * → discos → contacto → navegación entre perfiles → resto del equipo.
 */
import { Fragment } from 'react';
import { Link, useParams } from 'react-router';
import members from '../data/members.json';
import AnchorBar from '../components/AnchorBar.jsx';
import Section from '../components/Section.jsx';
import RoleDemo from '../components/RoleDemo.jsx';
import SkillCard from '../components/SkillCard.jsx';
import MovieCard from '../components/MovieCard.jsx';
import AlbumCard from '../components/AlbumCard.jsx';
import ProfileNav from '../components/ProfileNav.jsx';
import RestCard from '../components/RestCard.jsx';
import NotFound from './NotFound.jsx';

const ANCHORS = [
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'habilidades', label: 'Habilidades' },
  { id: 'peliculas', label: 'Películas' },
  { id: 'discos', label: 'Discos' },
  { id: 'contacto', label: 'Contáctame' }
];

export default function Profile() {
  const { slug } = useParams();
  const index = members.findIndex((m) => m.slug === slug);
  /* Slug inexistente (/equipo/pepito): se muestra la 404 en lugar de romper la página. */
  if (index < 0) return <NotFound />;

  const member = members[index];
  const others = members.filter((m) => m.slug !== member.slug); // las 4 tarjetas restantes
  const firstName = member.nombre.split(' ')[0];

  /* La key reinicia el estado (p. ej. un Spotify abierto) al pasar de un perfil a otro. */
  return (
    <Fragment key={member.slug}>
      <title>{`${member.nombre} · ${member.rol} · Eximia Code`}</title>
      <meta name="description" content={`Perfil de ${member.nombre} (${member.rol}) en Eximia Code · Grupo 12.`} />

      {/* HERO DEL PERFIL: foto a la IZQUIERDA en escritorio / arriba en móvil, datos y demo del rol. */}
      <section className="profile-hero" id="sobre-mi" aria-labelledby="perfil-titulo">
        <div className="container profile-grid">
          <figure className="profile-photo">
            <img src={`/img/${member.avatar}`} srcSet={`/img/${member.avatar400} 400w, /img/${member.avatar} 1200w`} sizes="(max-width: 900px) 100vw, 560px" alt={member.avatarAlt} width="1200" height="1200" fetchPriority="high" decoding="async" />
          </figure>
          <div>
            <span className="eyebrow">Perfil {member.id} · Grupo 12</span>
            <h1 id="perfil-titulo" tabIndex={-1}>{member.nombre}</h1>
            <p className="role">{member.rol}</p>
            <div className="meta"><span>📍 {member.ciudad}</span><span>🎂 {member.edad} años</span></div>
            <p>{member.resumen}</p>
            <div className="hero-actions">
              <a className="btn btn-secondary" href={member.github} target="_blank" rel="noopener noreferrer" aria-label={`GitHub de ${member.nombre} (se abre en una pestaña nueva)`}>GitHub ↗</a>
              {/* Contáctame lleva al formulario ÚNICO e identifica a la persona con ?para=slug. */}
              <Link className="btn btn-primary" to={`/contacto?para=${member.slug}`}>Contáctame</Link>
            </div>
            <RoleDemo {...member.demo} />
          </div>
        </div>
      </section>

      <AnchorBar items={ANCHORS} label="Navegación interna del perfil" />

      <Section id="habilidades" eyebrow="Stack" title="Habilidades" intro="Herramientas seleccionadas para representar el aporte de este perfil al equipo.">
        <div className="skills-grid">
          {member.habilidades.map((skill) => <SkillCard key={skill.nombre} skill={skill} />)}
        </div>
      </Section>

      <Section id="peliculas" alt eyebrow="Preferencias" title="Películas favoritas" intro="Selección personal del integrante. Tocá un póster para buscarlo en IMDb.">
        <div className="media-grid">
          {member.peliculas.map((movie) => <MovieCard key={movie.titulo} movie={movie} />)}
        </div>
      </Section>

      <Section id="discos" eyebrow="Música" title="Discos favoritos" intro="Al activar ▶, Spotify se carga bajo demanda dentro del mismo cuadrado y se detiene al cambiar de página.">
        <div className="media-grid">
          {member.discos.map((album) => <AlbumCard key={album.embedUrl} album={album} />)}
        </div>
      </Section>

      <Section id="contacto" alt eyebrow="Contacto" title={`Contactá a ${member.nombre}`}>
        <div className="contact-profile">
          <p className="muted">Usamos un único formulario general: al entrar desde este perfil, el mensaje queda identificado para {firstName}.</p>
          <p><a href={`mailto:${member.email}`}>{member.email}</a></p>
          <Link className="btn btn-primary" to={`/contacto?para=${member.slug}`}>Escribir a {firstName}</Link>
        </div>
      </Section>

      <section className="section" aria-labelledby="resto-titulo">
        <div className="container">
          <ProfileNav index={index} />
          <div className="section-heading">
            <div><span className="eyebrow">Continuá explorando</span><h2 id="resto-titulo">Conocé al resto del equipo</h2></div>
            <Link className="card-link" to="/equipo">Ver todo el equipo</Link>
          </div>
          <div className="rest-grid">
            {others.map((m) => <RestCard key={m.id} member={m} />)}
          </div>
        </div>
      </section>
    </Fragment>
  );
}
