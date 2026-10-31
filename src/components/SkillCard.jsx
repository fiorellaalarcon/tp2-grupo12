/**
 * EXIMIA CODE · Tarjeta de habilidad
 * Iconos Devicon decorativos (aria-hidden): el nombre en texto los hace accesibles.
 * - Figma: SVG propio multicolor (cinco colores de la marca).
 * - GitHub y Apache Kafka (`mono`): negro en modo claro y blanco en oscuro (clases del TP1).
 */
export default function SkillCard({ skill }) {
  if (skill.custom === 'figma') {
    return (
      <article className="skill">
        <span aria-hidden="true" className="skill-icon figma-logo">
          <svg viewBox="0 0 64 96" focusable="false">
            <path d="M16 0h16v24H16A16 16 0 1 1 16 0z" fill="#F24E1E" />
            <path d="M16 24h16v24H16a12 12 0 1 1 0-24z" fill="#FF7262" />
            <path d="M16 48h16v24H16a12 12 0 1 1 0-24z" fill="#A259FF" />
            <path d="M32 0h16a12 12 0 1 1 0 24H32V0z" fill="#1ABCFE" />
            <path d="M32 24h16a12 12 0 1 1 0 24H32V24z" fill="#0ACF83" />
          </svg>
        </span>
        <strong>{skill.nombre}</strong>
      </article>
    );
  }
  const extra = skill.mono ? (skill.icon === 'github-original' ? 'github-theme-icon' : 'skill-kafka') : 'colored';
  return (
    <article className="skill">
      <i aria-hidden="true" className={`devicon-${skill.icon} ${extra}`}></i>
      <strong>{skill.nombre}</strong>
    </article>
  );
}
