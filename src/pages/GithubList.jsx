/**
 * EXIMIA CODE · Perfiles de GitHub del equipo
 * Los enlaces externos viven fuera de las tarjetas para no mezclar dos acciones (ver perfil / visitar repositorio).
 */
import members from '../data/members.json';

export default function GithubList() {
  return (
    <div className="github-section">
      <h3 id="github-titulo">GitHub</h3>
      <p className="github-heading">También podés visitar nuestros perfiles personales en GitHub:</p>
      <ul className="github-list">
        {members.map((m) => (
          <li key={m.id}>
            <a href={m.github} target="_blank" rel="noopener noreferrer" aria-label={`GitHub de ${m.nombre} (se abre en una pestaña nueva)`}>
              <i className="devicon-github-original" aria-hidden="true"></i>
              {m.nombre} ↗
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
