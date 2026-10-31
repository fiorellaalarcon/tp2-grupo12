/**
 * EXIMIA CODE · Recursos JSON: red de clientes de Eximia Code
 * - Datos locales: src/data/catalogo.json (24 registros ficticios relacionados con el proyecto).
 * - Búsqueda por texto + filtro por tipo + filtro por país. Todos actualizan los resultados.
 * - Informa cuando no hay resultados y permite restablecer la lista completa (criterio 11 · Propone).
 * - useMemo evita recalcular el filtro si no cambió ningún control.
 */
import { useId, useMemo, useState } from 'react';
import catalogo from '../data/catalogo.json';
import AnchorBar from '../components/AnchorBar.jsx';
import CatalogCard from '../components/CatalogCard.jsx';
import Section from '../components/Section.jsx';

const ANCHORS = [
  { id: 'filtros', label: 'Búsqueda y filtros' },
  { id: 'resultados', label: 'Resultados' },
  { id: 'acerca', label: 'Acerca del catálogo' }
];

/* Normaliza para buscar sin distinguir mayúsculas ni tildes ("cordoba" encuentra "Córdoba"). */
const normalize = (text) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const unique = (key) => [...new Set(catalogo.map((item) => item[key]))].sort((a, b) => a.localeCompare(b, 'es'));
const TIPOS = unique('tipo');
const PAISES = unique('pais');

export default function Catalog() {
  const searchId = useId();
  const typeId = useId();
  const countryId = useId();
  const [query, setQuery] = useState('');
  const [tipo, setTipo] = useState('');
  const [pais, setPais] = useState('');

  const results = useMemo(() => {
    const q = normalize(query.trim());
    return catalogo.filter((item) => {
      const text = normalize(`${item.nombre} ${item.ciudad} ${item.pais} ${item.servicio} ${item.tecnologia} ${item.descripcion}`);
      return (!q || text.includes(q)) && (!tipo || item.tipo === tipo) && (!pais || item.pais === pais);
    });
  }, [query, tipo, pais]);

  const hasFilters = query !== '' || tipo !== '' || pais !== '';
  const reset = () => { setQuery(''); setTipo(''); setPais(''); };

  return (
    <>
      <title>Recursos JSON · Eximia Code</title>
      <meta name="description" content="Catálogo de clientes de Eximia Code con búsqueda y filtros, cargado desde un JSON local." />

      <section className="hero page-hero" aria-labelledby="recursos-titulo">
        <div className="container">
          <span className="eyebrow">Datos locales · JSON</span>
          <h1 id="recursos-titulo" tabIndex={-1}>Clientes que confían en Eximia Code</h1>
          <p>Restaurantes, distribuidoras, hoteles y más que usan nuestra plataforma de logística B2B. <strong>Los nombres son ficticios</strong> y sirven para representar el alcance de la propuesta.</p>
        </div>
      </section>

      <AnchorBar items={ANCHORS} label="Navegación interna de recursos" />

      <Section id="filtros" eyebrow="Explorar" title="Búsqueda y filtros" intro={`${catalogo.length} clientes en el catálogo.`}>
        <form className="filter-bar" role="search" aria-label="Buscar y filtrar clientes" onSubmit={(e) => e.preventDefault()}>
          <div className="field">
            <label htmlFor={searchId}>Buscar por texto</label>
            <input id={searchId} type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Nombre, ciudad, servicio…" autoComplete="off" />
          </div>
          <div className="field">
            <label htmlFor={typeId}>Tipo de cliente</label>
            <select id={typeId} value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option value="">Todos los tipos</option>
              {TIPOS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor={countryId}>País</label>
            <select id={countryId} value={pais} onChange={(e) => setPais(e.target.value)}>
              <option value="">Todos los países</option>
              {PAISES.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <button className="btn btn-secondary" type="button" onClick={reset} disabled={!hasFilters}>Restablecer</button>
        </form>
      </Section>

      <Section id="resultados" alt eyebrow="Catálogo" title="Resultados">
        {/* aria-live anuncia la cantidad de resultados cada vez que cambian los controles. */}
        <p className="log-count" role="status" aria-live="polite">
          {results.length === catalogo.length ? `Mostrando los ${catalogo.length} clientes.` : `Mostrando ${results.length} de ${catalogo.length} clientes.`}
        </p>
        {results.length > 0 ? (
          <div className="catalog-grid">
            {results.map((item) => <CatalogCard key={item.id} item={item} />)}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No encontramos clientes con esos criterios</h3>
            <p>Probá con otra palabra o quitá algún filtro.</p>
            <button className="btn btn-primary" type="button" onClick={reset}>Restablecer y ver todos</button>
          </div>
        )}
      </Section>

      <Section id="acerca" eyebrow="Fuente" title="Acerca del catálogo">
        <p>Los datos están en <code>src/data/catalogo.json</code> y se importan como módulo: no hay pedidos de red. Cada registro tiene id, nombre, tipo, ciudad, país, año de alta, servicio, tecnología, entregas mensuales y descripción. FreshRoute, entre otros, es un cliente ficticio creado para este trabajo.</p>
      </Section>
    </>
  );
}
