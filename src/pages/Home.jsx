/**
 * EXIMIA CODE · Portada (Inicio)
 * Hero original, panel.webp a la derecha, demo interactiva mejorada, CTA a contacto y al equipo,
 * tarjetas del equipo y enlaces a GitHub. El contenido sale de members.json.
 */
import { Link } from 'react-router';
import { preload } from 'react-dom';
import members from '../data/members.json';
import AnchorBar from '../components/AnchorBar.jsx';
import RouteDemo from '../components/RouteDemo.jsx';
import Section from '../components/Section.jsx';
import TeamCard from '../components/TeamCard.jsx';
import GithubList from '../components/GithubList.jsx';
import RandomProfile from '../components/RandomProfile.jsx';
import Icon from '../components/Icon.jsx';

const ANCHORS = [
  { id: 'inicio', label: 'Presentación' },
  { id: 'equipo', label: 'Equipo' },
  { id: 'recorrido', label: 'Recorrido' },
  { id: 'contacto-cta', label: 'Contacto' }
];

export default function Home() {
  /* React 19: preload() pide la imagen LCP antes de que el navegador la descubra en el DOM. */
  preload('/img/panel.webp', { as: 'image', fetchPriority: 'high' });

  return (
    <>
      {/* React 19 eleva <title> y <meta> al <head> automáticamente. */}
      <title>Inicio · Eximia Code</title>
      <meta name="description" content="Eximia Code · Grupo 12 · TP2: sitio colaborativo en React para logística inteligente B2B." />

      {/* PORTADA: nombre, propósito, CTA y demo dinámica */}
      <section className="hero" id="inicio" aria-labelledby="portada-titulo">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Grupo 12 · TP2 · Frontend</span>
            <h1 id="portada-titulo" tabIndex={-1}>Eximia Code</h1>
            <p><strong>Somos un equipo especializado en el desarrollo de software para logística inteligente B2B y optimización de rutas.</strong></p>
            <p>Nuestro propósito es combinar diseño UX/UI, adaptabilidad responsive y eficiencia técnica para crear soluciones digitales modernas para el sector logístico. Este sitio colaborativo (ahora una SPA en React) presenta a nuestro equipo, sus perfiles, un catálogo de recursos, una API pública y nuestra bitácora.</p>
            {/* BOTONES DE ACCIÓN: ahora son enlaces del router, no anclas del documento. */}
            <div className="hero-actions">
              <a className="btn btn-secondary" href="#equipo" onClick={(e) => { e.preventDefault(); document.getElementById('equipo')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); }}>Conoce al equipo</a>
              <Link className="btn btn-primary" to="/contacto">Contacto</Link>
            </div>
          </div>
          {/* Panel alineado con el inicio del texto; la demo dinámica queda debajo de ambos. */}
          <figure className="hero-media">
            <img src="/img/panel.webp" width="1200" height="1200" alt="Panel web de control logístico: mapa de rutas, temperatura de carga y métricas de entregas en laptop y celular" fetchPriority="high" decoding="async" />
          </figure>
        </div>
        <div className="container hero-demo-row">
          <RouteDemo />
        </div>
      </section>

      <AnchorBar items={ANCHORS} label="Navegación interna de la portada" />

      <Section id="equipo" eyebrow="Equipo" title="Nuestro equipo" intro="Cinco perfiles complementarios para pensar producto, datos, backend, experiencia, calidad y operación.">
        <div className="team-grid">
          {members.map((member) => <TeamCard key={member.id} member={member} />)}
        </div>
        <RandomProfile members={members} />
        <GithubList />
        <ul className="stats">
          <li className="stat"><strong>5</strong>integrantes</li>
          <li className="stat"><strong>4</strong>habilidades por perfil</li>
          <li className="stat"><strong>100%</strong>Sinergia</li>
        </ul>
      </Section>

      <Section id="recorrido" eyebrow="Explorá" title="Recorré el proyecto" intro="Además de conocer al equipo, descubrí cómo está construida la aplicación.">
        <div className="project-links-grid">
          <Link className="project-link-card" to="/recursos"><Icon name="database" size={25} /><span><strong>Recursos JSON</strong><small>Explorá el catálogo local, buscá y filtrá sus registros.</small></span><span className="project-link-arrow" aria-hidden="true">↗</span></Link>
          <Link className="project-link-card" to="/api"><Icon name="cloud" size={25} /><span><strong>API pública</strong><small>Conocé los datos consultados y sus estados de carga.</small></span><span className="project-link-arrow" aria-hidden="true">↗</span></Link>
          <Link className="project-link-card" to="/arbol"><Icon name="tree" size={25} /><span><strong>Árbol de renderizado</strong><small>Recorré la jerarquía de componentes de React.</small></span><span className="project-link-arrow" aria-hidden="true">↗</span></Link>
          <Link className="project-link-card" to="/bitacora"><Icon name="book" size={25} /><span><strong>Bitácora</strong><small>Seguí las decisiones, dificultades y avances del equipo.</small></span><span className="project-link-arrow" aria-hidden="true">↗</span></Link>
        </div>
      </Section>

      <Section id="contacto-cta" alt eyebrow="Contacto" title="Hablemos con Eximia Code" intro="Un único formulario general para todo el equipo.">
        <p>Escribinos desde el formulario: si llegás desde un perfil, el mensaje se identifica con esa persona.</p>
        <div className="hero-actions">
          <Link className="btn btn-primary" to="/contacto">Ir al formulario</Link>
          <Link className="btn btn-secondary" to="/equipo">Ver la página del equipo</Link>
        </div>
      </Section>
    </>
  );
}
