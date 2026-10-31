/**
 * EXIMIA CODE · Disco con Spotify bajo demanda (patrón facade)
 * - Muestra la portada original con efecto de vinilo (CSS).
 * - El <iframe> de Spotify se crea SOLO al pulsar ▶ (la URL viene de members.json: `embedUrl`).
 * - Como el iframe vive dentro de este componente, al cambiar de página React lo desmonta
 *   y la reproducción se detiene. "Cerrar reproductor" también la detiene.
 */
import { useState } from 'react';
import Icon from './Icon.jsx';

export default function AlbumCard({ album }) {
  const [playing, setPlaying] = useState(false);

  function play() {
    /* Sin URL de embed se ofrece la búsqueda/enlace en Spotify (alternativa del TP1). */
    if (!album.embedUrl) {
      window.open(album.spotifyUrl, '_blank', 'noopener');
      return;
    }
    setPlaying(true);
  }

  return (
    <article className="album-card spotify-facade">
      <figure className={playing ? 'album-media is-playing' : 'album-media'}>
        {playing ? (
          <iframe
            title={`Reproductor de Spotify: ${album.titulo} de ${album.artista}`}
            src={album.embedUrl}
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
        ) : (
          <>
            <span className="vinyl" aria-hidden="true"></span>
            <img className="album-img" src={`/img/${album.imagen}`} alt={album.alt} width="300" height="300" loading="lazy" decoding="async" />
            <button className="play-btn" type="button" onClick={play} aria-label={`Reproducir ${album.titulo} de ${album.artista}`}>
              <Icon name="play" size={22} />
            </button>
          </>
        )}
      </figure>
      <header className="album-info">
        <h3 className="album-title">{album.titulo}</h3>
        <p className="album-artist">{album.artista} · {album.anio}</p>
        {playing && (
          <div className="album-actions">
            <button className="btn btn-secondary btn-small" type="button" onClick={() => setPlaying(false)}>Cerrar reproductor</button>
            <a href={album.spotifyUrl} target="_blank" rel="noopener noreferrer">Abrir en Spotify ↗</a>
          </div>
        )}
      </header>
    </article>
  );
}
