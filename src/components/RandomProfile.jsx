/** Selector accesible para descubrir un perfil al azar, reutilizable en las secciones con tarjetas. */
import { useState } from 'react';
import { Link } from 'react-router';

export default function RandomProfile({ members, label = '¿A quién conocés ahora?' }) {
  const [chosen, setChosen] = useState(null);
  const candidates = Array.isArray(members) ? members : [];

  function chooseRandom() {
    if (!candidates.length) return;
    const available = candidates.filter((member) => member.slug !== chosen?.slug);
    const pool = available.length ? available : candidates;
    setChosen(pool[Math.floor(Math.random() * pool.length)]);
  }

  if (!candidates.length) return null;

  return (
    <div className="random-profile" aria-live="polite">
      <div className="random-profile-copy">
        <strong>{label}</strong>
        <p>Dejá que te recomendemos uno de los perfiles del equipo.</p>
      </div>
      <button className="btn btn-secondary" type="button" onClick={chooseRandom}>
        Elegir perfil al azar
      </button>
      {chosen && (
        <p className="random-profile-result">
          Te proponemos conocer a <strong>{chosen.nombre}</strong> · {chosen.rol}.{' '}
          <Link to={`/equipo/${chosen.slug}`}>Ver perfil de {chosen.nombre} →</Link>
        </p>
      )}
    </div>
  );
}
