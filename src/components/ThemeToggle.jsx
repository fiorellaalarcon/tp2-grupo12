/**
 * EXIMIA CODE · Botón de tema claro/oscuro
 * La etiqueta describe la acción y contiene el texto visible ("Modo claro" / "Modo oscuro").
 * No se usa aria-pressed: combinarlo con una etiqueta cambiante se anuncia dos veces (decisión del TP1).
 */
import { useTheme } from '../context/ThemeContext.jsx';
import Icon from './Icon.jsx';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      <Icon name={isDark ? 'sun' : 'moon'} />
      <span className="theme-label">{isDark ? 'Modo claro' : 'Modo oscuro'}</span>
    </button>
  );
}
