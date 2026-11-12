import { Link } from 'react-router';

export default function PageNavigation({ links, label = 'Navegación de la página', showTop = false }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth'
    });
  };

  return (
    <nav className="profile-nav page-final-nav" aria-label={label}>
      {links.map((link) => (
        <Link key={link.to} className="card-link" to={link.to}>
          {link.label}
        </Link>
      ))}

      {showTop && (
        <button
          className="card-link page-top-button"
          type="button"
          onClick={scrollToTop}
        >
    <span aria-hidden="true">↑</span>
      Volver arriba
    </button>
    )}
    </nav>
  );
}