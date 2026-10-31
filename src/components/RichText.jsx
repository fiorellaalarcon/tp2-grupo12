/**
 * EXIMIA CODE · Texto enriquecido mínimo para los datos JSON
 * Convierte **negrita** y `código` en elementos <strong> y <code>.
 * Se evita dangerouslySetInnerHTML: el contenido nunca se interpreta como HTML.
 */
export default function RichText({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>;
        if (part.startsWith('`')) return <code key={index}>{part.slice(1, -1)}</code>;
        return part;
      })}
    </>
  );
}
