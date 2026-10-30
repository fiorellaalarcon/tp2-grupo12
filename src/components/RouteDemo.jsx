/**
 * EXIMIA CODE · Demo interactiva de la portada: "Optimizar ruta"
 * Versión mejorada de js/index.js: ahora se elige zona y cantidad de entregas, se "calcula"
 * y se compara el recorrido sin optimizar con el optimizado (SVG + métricas).
 * Los cálculos son DETERMINISTAS (mismos datos → mismo resultado), como en el TP1: la demo es repetible.
 * Hooks: useState (estado), useId (ids de los campos), useMemo (resultado derivado), useEffect/useRef (progreso).
 */
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import useMediaQuery from '../hooks/useMediaQuery.js';

const ZONAS = [
  { id: 'norte', nombre: 'Zona Norte', factor: 3 },
  { id: 'centro', nombre: 'Centro', factor: 5 },
  { id: 'sur', nombre: 'Zona Sur', factor: 2 },
  { id: 'costa', nombre: 'Costanera', factor: 4 }
];

/* Genera puntos de parada repartidos de forma determinista dentro de un SVG de 300 × 160. */
function buildStops(count, seed) {
  return Array.from({ length: count }, (_, i) => ({
    x: 20 + ((i * 53 + seed * 17) % 260),
    y: 20 + ((i * 37 + seed * 29) % 120)
  }));
}

/* Orden "optimizado": recorrido por vecino más cercano partiendo de la primera parada. */
function nearestOrder(stops) {
  const pending = stops.slice(1);
  const route = [stops[0]];
  while (pending.length) {
    const last = route[route.length - 1];
    pending.sort((a, b) => Math.hypot(a.x - last.x, a.y - last.y) - Math.hypot(b.x - last.x, b.y - last.y));
    route.push(pending.shift());
  }
  return route;
}

const toPoints = (route) => route.map((p) => `${p.x},${p.y}`).join(' ');
const length = (route) => route.slice(1).reduce((sum, p, i) => sum + Math.hypot(p.x - route[i].x, p.y - route[i].y), 0);

export default function RouteDemo() {
  const zoneId = useId();
  const stopsId = useId();
  const [zona, setZona] = useState(ZONAS[1]);
  const [entregas, setEntregas] = useState(8);
  const [fase, setFase] = useState('idle'); // idle | calculando | listo
  const timer = useRef(0);
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  /* Derivado: se recalcula sólo si cambian zona o entregas. */
  const result = useMemo(() => {
    const stops = buildStops(entregas, zona.factor);
    const optimized = nearestOrder(stops);
    const before = length(stops);
    const after = length(optimized);
    const ahorro = Math.max(5, Math.round((1 - after / before) * 100));
    return { stops, optimized, ahorro, km: Math.round(entregas * 6.4 * (1 - ahorro / 100)), temp: (3.2 + zona.factor * 0.12).toFixed(1) };
  }, [entregas, zona]);

  /* Limpieza del temporizador al desmontar (evita setState sobre un componente inexistente). */
  useEffect(() => () => clearTimeout(timer.current), []);

  function optimize() {
    clearTimeout(timer.current);
    setFase('calculando');
    timer.current = setTimeout(() => setFase('listo'), reduceMotion ? 0 : 700);
  }

  /* Cambiar un dato invalida el resultado anterior. */
  const invalidate = () => setFase('idle');

  return (
    <div className="dynamic-box route-demo">
      <strong>Prueba nuestra Demo dinámica:</strong>
      <div className="route-controls">
        <label htmlFor={zoneId}>Zona
          <select id={zoneId} value={zona.id} onChange={(e) => { setZona(ZONAS.find((z) => z.id === e.target.value)); invalidate(); }}>
            {ZONAS.map((z) => <option key={z.id} value={z.id}>{z.nombre}</option>)}
          </select>
        </label>
        <label htmlFor={stopsId}>Entregas: {entregas}
          <input id={stopsId} type="range" min="4" max="14" value={entregas} onChange={(e) => { setEntregas(Number(e.target.value)); invalidate(); }} />
        </label>
      </div>

      {/* role="status": el mensaje se anuncia sin mover el foco (igual que en el TP1). */}
      <p className="dynamic-message" role="status">
        {fase === 'idle' && 'Sistema listo para calcular una ruta inteligente.'}
        {fase === 'calculando' && 'Calculando la mejor secuencia de entregas…'}
        {fase === 'listo' && `Ruta optimizada en ${zona.nombre}: ${result.ahorro}% menos kilómetros simulados · ${result.km} km · cadena de frío ${result.temp} °C.`}
      </p>

      <svg className="route-svg" viewBox="0 0 300 160" role="img" aria-label={fase === 'listo' ? `Ruta optimizada con ${entregas} paradas` : `Mapa simulado con ${entregas} paradas sin ordenar`}>
        <polyline className={fase === 'listo' ? 'route-line route-line--ok' : 'route-line'} points={toPoints(fase === 'listo' ? result.optimized : result.stops)} />
        {result.stops.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="5" className="route-stop" />)}
      </svg>

      <button className="btn btn-secondary" type="button" onClick={optimize} disabled={fase === 'calculando'}>
        {fase === 'listo' ? 'Recalcular ruta' : 'Optimizar ruta'}
      </button>
    </div>
  );
}
