/**
 * EXIMIA CODE · Tarjeta de película (clickeable)
 * Póster completo 300×450 (proporción 2:3 original). Toda la tarjeta es un enlace a IMDb
 * (búsqueda por título y año) que se abre en pestaña nueva.
 */
export default function MovieCard({ movie }) {
  const url = `https://www.imdb.com/find/?q=${encodeURIComponent(`${movie.titulo} ${movie.anio}`)}&s=tt`;
  return (
    <a className="movie-card movie-card-link" href={url} target="_blank" rel="noopener noreferrer" aria-label={`Buscar ${movie.titulo} (${movie.anio}) en IMDb (se abre en una pestaña nueva)`}>
      <img src={`/img/${movie.imagen}`} alt={movie.alt} width="300" height="450" loading="lazy" decoding="async" />
      <div className="movie-info">
        <h3>{movie.titulo}</h3>
        <p className="muted">{movie.anio}</p>
      </div>
    </a>
  );
}
