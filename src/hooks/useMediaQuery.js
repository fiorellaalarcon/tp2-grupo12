/**
 * EXIMIA CODE · Hook useMediaQuery
 * Devuelve true cuando la media query coincide. Usa useSyncExternalStore, el hook de React
 * pensado para suscribirse a fuentes externas (aquí, window.matchMedia).
 */
import { useCallback, useSyncExternalStore } from 'react';

export default function useMediaQuery(query) {
  const subscribe = useCallback(
    (onChange) => {
      const media = window.matchMedia(query);
      media.addEventListener('change', onChange);
      return () => media.removeEventListener('change', onChange);
    },
    [query]
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}
