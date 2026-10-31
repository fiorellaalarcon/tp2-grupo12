/**
 * EXIMIA CODE · Hook para consultar la API pública Open-Meteo
 * Estados: 'loading' | 'success' | 'error'. `refresh()` repite la consulta (reintentar / actualizar).
 * - fetch nativo (Fetch API) sin claves privadas: Open-Meteo permite CORS desde el navegador.
 * - AbortController cancela el pedido si el componente se desmonta o si se pide otro (evita carreras).
 * - Un tiempo máximo de 8 s convierte una red colgada en un error visible.
 */
import { useCallback, useEffect, useState } from 'react';

const BASE = 'https://api.open-meteo.com/v1/forecast';

export default function useOpenMeteo(cities) {
  const [state, setState] = useState({ status: 'loading', data: [], error: '', updatedAt: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(new Error('timeout')), 8000);
    const params = new URLSearchParams({
      latitude: cities.map((c) => c.lat).join(','),
      longitude: cities.map((c) => c.lon).join(','),
      current: 'temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code',
      timezone: 'auto'
    });

    fetch(`${BASE}?${params}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`La API respondió ${response.status}`);
        return response.json();
      })
      .then((json) => {
        /* Con varias coordenadas la API devuelve un arreglo; con una sola, un objeto. */
        const list = Array.isArray(json) ? json : [json];
        const data = list.map((entry, index) => ({ ...cities[index], current: entry.current, units: entry.current_units }));
        setState({ status: 'success', data, error: '', updatedAt: new Date() });
      })
      .catch((error) => {
        if (controller.signal.aborted && error.message !== 'timeout' && error.name === 'AbortError') return; // cancelación voluntaria
        setState((previous) => ({ ...previous, status: 'error', error: error.message === 'timeout' ? 'La consulta tardó demasiado.' : 'No pudimos conectar con la API.' }));
      })
      .finally(() => clearTimeout(timer));

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [cities, attempt]);

  /* Reintentar: primero se muestra "cargando" y luego se dispara una nueva consulta (efecto). */
  const refresh = useCallback(() => {
    setState((previous) => ({ ...previous, status: 'loading', error: '' }));
    setAttempt((n) => n + 1);
  }, []);
  return { ...state, refresh };
}