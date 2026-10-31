/**
 * EXIMIA CODE · API pública: Open-Meteo (clima actual en centros logísticos)
 * Qué aporta: temperatura, humedad, viento y estado del cielo de cada ciudad. Para una
 * empresa de cadena de frío, la temperatura ambiente es un dato de riesgo para el transporte.
 * No necesita clave (se consulta desde el navegador sin exponer credenciales).
 * Estados: cargando, error (con "Reintentar") y éxito (con "Actualizar").
 */
import AnchorBar from '../components/AnchorBar.jsx';
import Section from '../components/Section.jsx';
import useOpenMeteo from '../hooks/useOpenMeteo.js';

/* Constante fuera del componente: mantiene la misma referencia entre renders (el hook la usa como dependencia). */
const CITIES = [
  { name: 'Posadas', lat: -27.37, lon: -55.9 },
  { name: 'Buenos Aires', lat: -34.61, lon: -58.38 },
  { name: 'Córdoba', lat: -31.42, lon: -64.18 },
  { name: 'Rosario', lat: -32.95, lon: -60.65 },
  { name: 'Mendoza', lat: -32.89, lon: -68.83 },
  { name: 'Salta', lat: -24.78, lon: -65.41 }
];

const ANCHORS = [
  { id: 'consulta', label: 'Consulta' },
  { id: 'acerca-api', label: 'Acerca de la API' }
];

/* Códigos WMO simplificados que devuelve Open-Meteo. */
function describe(code) {
  if (code === 0) return 'Despejado';
  if (code <= 3) return 'Parcialmente nublado';
  if (code <= 48) return 'Niebla';
  if (code <= 67) return 'Lluvia';
  if (code <= 77) return 'Nieve';
  if (code <= 82) return 'Chubascos';
  return 'Tormenta';
}

/* Regla simple de negocio: más calor ambiente, más riesgo para la cadena de frío. */
function coldChain(temp) {
  if (temp >= 30) return { nivel: 'alto', texto: 'Riesgo alto para la cadena de frío' };
  if (temp >= 25) return { nivel: 'medio', texto: 'Precaución en tramos largos' };
  return { nivel: 'bajo', texto: 'Condición estable' };
}

export default function ApiPage() {
  const { status, data, error, updatedAt, refresh } = useOpenMeteo(CITIES);

  return (
    <>
      <title>API pública · Eximia Code</title>
      <meta name="description" content="Clima actual en centros logísticos, consultado a la API pública Open-Meteo." />

      <section className="hero page-hero" aria-labelledby="api-titulo">
        <div className="container">
          <span className="eyebrow">API pública · Open-Meteo</span>
          <h1 id="api-titulo" tabIndex={-1}>Clima en nuestros centros logísticos</h1>
          <p>Antes de despachar, un equipo de logística revisa el clima: la temperatura ambiente cambia el riesgo de la cadena de frío. Estos datos se consultan en vivo a una API pública.</p>
        </div>
      </section>

      <AnchorBar items={ANCHORS} label="Navegación interna de la API" />

      <Section id="consulta" eyebrow="En vivo" title="Condiciones actuales">
        <div className="api-toolbar">
          <button className="btn btn-primary" type="button" onClick={refresh} disabled={status === 'loading'}>
            {status === 'loading' ? 'Consultando…' : 'Actualizar datos'}
          </button>
          {updatedAt && status === 'success' && <span className="muted">Actualizado a las {updatedAt.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}</span>}
        </div>

        {/* ESTADO DE CARGA */}
        {status === 'loading' && <p className="api-state" role="status">Cargando datos del clima…</p>}

        {/* ESTADO DE ERROR: mensaje claro + forma de reintentar (alert se anuncia de inmediato). */}
        {status === 'error' && (
          <div className="api-state api-state--error" role="alert">
            <p><strong>No se pudieron cargar los datos.</strong> {error}</p>
            <button className="btn btn-secondary" type="button" onClick={refresh}>Reintentar</button>
          </div>
        )}

        {/* RESULTADOS: se conservan visibles durante una actualización para evitar parpadeos. */}
        {data.length > 0 && status !== 'error' && (
          <ul className="weather-grid">
            {data.map((city) => {
              const risk = coldChain(city.current.temperature_2m);
              return (
                <li key={city.name} className={`weather-card risk-${risk.nivel}`}>
                  <h3>{city.name}</h3>
                  <p className="weather-temp">{Math.round(city.current.temperature_2m)} °C</p>
                  <p className="muted">{describe(city.current.weather_code)}</p>
                  <p>Humedad {city.current.relative_humidity_2m}% · Viento {Math.round(city.current.wind_speed_10m)} km/h</p>
                  <p className="risk-label"><strong>{risk.texto}</strong></p>
                </li>
              );
            })}
          </ul>
        )}
      </Section>

      <Section id="acerca-api" alt eyebrow="Fuente" title="Acerca de la API">
        <p><strong>Open-Meteo</strong> es una API meteorológica abierta y gratuita. Esta pantalla pide temperatura, humedad, viento y código de clima de seis ciudades con una sola consulta, sin clave de acceso.</p>
        <p className="muted">Endpoint: <code>api.open-meteo.com/v1/forecast</code> · Documentación en <a href="https://open-meteo.com/en/docs" target="_blank" rel="noopener noreferrer">open-meteo.com ↗</a>. Los niveles de riesgo son una regla simple de demostración, no una recomendación operativa.</p>
      </Section>
    </>
  );
}
