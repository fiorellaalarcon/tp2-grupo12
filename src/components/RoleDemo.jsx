/**
 * EXIMIA CODE · Interacción de rol (migrada de js/fiorella.js, axel.js, malena.js, javier.js y selene.js)
 * Un solo componente para los 5 perfiles: recibe `titulo`, `boton` y `frases` por props.
 * Cada clic muestra la siguiente frase. El índice es circular: tras la última vuelve a la primera.
 */
import { useState } from 'react';

export default function RoleDemo({ titulo, boton, frases }) {
  const [index, setIndex] = useState(-1);

  return (
    <div className="dynamic-box">
      <strong>{titulo}:</strong>
      {/* role="status" anuncia el cambio de frase a lectores de pantalla sin mover el foco. */}
      <p className="dynamic-message" role="status">{index < 0 ? 'Listo para ejecutar una demo.' : frases[index]}</p>
      <button className="btn btn-secondary role-demo-btn" type="button" onClick={() => setIndex((current) => (current + 1) % frases.length)}>
        {index < 0 ? boton : 'Siguiente resultado'}
      </button>
    </div>
  );
}
