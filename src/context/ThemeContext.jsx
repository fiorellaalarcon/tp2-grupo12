/**
 * EXIMIA CODE · Tema claro / oscuro con React Context
 * Misma prioridad que el TP1: 1) elección guardada, 2) preferencia del sistema, 3) claro.
 * - La elección se guarda en localStorage con la clave 'eximia-theme' (compatible con TP1).
 * - Se sincroniza entre pestañas con el evento `storage`.
 * - El script del <head> en index.html aplica el tema antes de pintar (evita el parpadeo).
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import useMediaQuery from '../hooks/useMediaQuery.js';

const STORAGE_KEY = 'eximia-theme';
const ThemeContext = createContext(null);

/* localStorage puede fallar (modo privado o bloqueo): se envuelve en try/catch. */
function readStored() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

export function ThemeProvider({ children }) {
  /* choice = elección manual (null significa "seguir al sistema"). */
  const [choice, setChoice] = useState(readStored);
  const systemDark = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = choice ?? (systemDark ? 'dark' : 'light');

  /* Refleja el tema en <html data-theme> para que las variables CSS cambien. */
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  /* Sincroniza otras pestañas abiertas del sitio. */
  useEffect(() => {
    function onStorage(event) {
      if (event.key === STORAGE_KEY) setChoice(readStored());
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setChoice(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* sin persistencia: el tema igual cambia durante la sesión */
    }
  }, [theme]);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/* Hook de consumo: falla con un mensaje claro si se usa fuera del Provider. */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme debe usarse dentro de <ThemeProvider>');
  return context;
}
