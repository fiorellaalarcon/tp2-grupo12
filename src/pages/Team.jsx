/**
 * EXIMIA CODE · Equipo
 * Presentación propia del equipo (misión, cómo trabajamos, responsabilidades) y tarjetas de los 5 integrantes.
 */
import { Link } from 'react-router';
import members from '../data/members.json';
import AnchorBar from '../components/AnchorBar.jsx';
import Section from '../components/Section.jsx';
import TeamCard from '../components/TeamCard.jsx';
import GithubList from '../components/GithubList.jsx';
import RandomProfile from '../components/RandomProfile.jsx';

const ANCHORS = [
  { id: 'presentacion', label: 'Presentación' },
  { id: 'integrantes', label: 'Integrantes' },
  { id: 'responsabilidades', label: 'Responsabilidades' }
];

/* Responsabilidad de cada integrante en el TP2 (misma información que el README). */
const RESPONSABILIDADES = {
  fiorella: 'Estructura base, tokens de diseño, sidebar, header, tema y rutas.',
  malena: 'Portada, tarjetas del equipo, catálogo con búsqueda/filtro y responsive.',
  javier: 'Perfiles reutilizables, Spotify bajo demanda y navegación interna (ScrollSpy).',
  axel: 'Formulario único con validación y envío AJAX, y consumo de la API pública.',
  selene: 'Bitácora, árbol de renderizado, README, despliegue y documentación.'
};

export default function Team() {
  return (
    <>
      <title>Equipo · Eximia Code</title>
      <meta name="description" content="Conocé a los cinco integrantes del Grupo 12 de Eximia Code." />

      <section className="hero team-hero" id="presentacion" aria-labelledby="equipo-pagina-titulo">
        <div className="container">
          <span className="eyebrow">Grupo 12 · Eximia Code</span>
          <h1 id="equipo-pagina-titulo" tabIndex={-1}>Un equipo, cinco perfiles</h1>
          <p><strong>Trabajamos con ramas por integrante, Pull Requests y commits convencionales.</strong></p>
          <p>Cada persona aporta un rol técnico dentro de nuestra empresa ficticia de software logístico. Elegí un perfil para conocer su recorrido, sus habilidades y sus gustos, o escribinos desde el formulario único de contacto.</p>
        </div>
      </section>

      <AnchorBar items={ANCHORS} label="Navegación interna del equipo" />

      <Section id="integrantes" eyebrow="Perfiles" title="Conocé al equipo" intro="Tocá una tarjeta para abrir el perfil.">
        <div className="team-grid">
          {members.map((member) => <TeamCard key={member.id} member={member} />)}
        </div>
        <RandomProfile members={members} />
        <GithubList />
      </Section>

      <Section id="responsabilidades" alt eyebrow="Roles" title="Responsabilidades en el TP2">
        <ul className="role-list">
          {members.map((m) => (
            <li key={m.id}>
              <Link to={`/equipo/${m.slug}`}><strong>{m.nombre}</strong> · {m.rol}</Link>
              <span>{RESPONSABILIDADES[m.slug]}</span>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
