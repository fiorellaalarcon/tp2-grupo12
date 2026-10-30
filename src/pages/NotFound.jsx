/**
 * EXIMIA CODE · Página no encontrada (404)
 * Se muestra para cualquier ruta inexistente y también cuando el slug de un perfil no existe.
 * Ofrece salidas claras para no depender del botón Atrás.
 */
import { Link } from 'react-router';

export default function NotFound() {
  return (
    <section className="section not-found" aria-labelledby="notfound-titulo">
      <title>Página no encontrada · Eximia Code</title>
      <div className="container narrow-content">
        <span className="eyebrow">Error 404</span>
        <h1 id="notfound-titulo" tabIndex={-1}>Página no encontrada</h1>
        <p>La dirección que abriste no existe o fue movida. Podés volver a una sección conocida:</p>
        <div className="hero-actions">
          <Link className="btn btn-primary" to="/">Ir al inicio</Link>
          <Link className="btn btn-secondary" to="/equipo">Ver el equipo</Link>
          <Link className="btn btn-secondary" to="/contacto">Contacto</Link>
        </div>
      </div>
    </section>
  );
}
