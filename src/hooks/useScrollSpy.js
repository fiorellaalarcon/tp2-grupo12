/**
 * EXIMIA CODE · ScrollSpy (navegación interna por anclas)
 * Migración del anchor bar del TP1: un listener de scroll dentro de useEffect evalúa si
 * window.scrollY está dentro de los límites (offsetTop / offsetHeight) de cada sección
 * y actualiza `activeId`. requestAnimationFrame limita el trabajo a un cálculo por cuadro.
 * `offset` compensa el header + la anchor bar sticky.
 */
import { useEffect, useState } from 'react';

export default function useScrollSpy(ids, offset = 150) {
  const key = ids.join('|'); // clave estable: el efecto se vuelve a armar sólo si cambian las secciones
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const sectionIds = key.split('|');
    let frame = 0;

    function update() {
      frame = 0;
      const position = window.scrollY + offset;
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section && position >= section.offsetTop && position < section.offsetTop + section.offsetHeight) {
          current = id;
        }
      }
      /* Al llegar al final de la página se resalta la última sección, aunque sea corta. */
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = sectionIds[sectionIds.length - 1];
      }
      setActiveId(current);
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [key, offset]);

  return activeId;
}
