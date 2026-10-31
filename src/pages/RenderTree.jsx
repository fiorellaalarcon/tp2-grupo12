/**
 * EXIMIA CODE · Árbol de renderizado
 * Representa la jerarquía REAL de componentes (src/data/tree.json corresponde al código entregado).
 * Se puede expandir y contraer cada nodo, o todos a la vez.
 */
import { useState } from 'react';
import tree from '../data/tree.json';
import AnchorBar from '../components/AnchorBar.jsx';
import ComponentTree from '../components/ComponentTree.jsx';
import Section from '../components/Section.jsx';

const ANCHORS = [
  { id: 'arbol', label: 'Árbol' },
  { id: 'como-leerlo', label: 'Cómo leerlo' }
];

export default function RenderTree() {
  /* `mode` fuerza abrir/cerrar todo; `version` remonta el árbol para aplicar el cambio. */
  const [view, setView] = useState({ mode: null, version: 0 });
  const apply = (mode) => setView((current) => ({ mode, version: current.version + 1 }));

  return (
    <>
      <title>Árbol de renderizado · Eximia Code</title>
      <meta name="description" content="Jerarquía real de componentes React de Eximia Code: App, layout, sidebar, páginas y tarjetas." />

      <section className="hero page-hero" aria-labelledby="arbol-titulo">
        <div className="container">
          <span className="eyebrow">Arquitectura · React 19.3</span>
          <h1 id="arbol-titulo" tabIndex={-1}>Árbol de renderizado</h1>
          <p>El componente principal <code>App</code> contiene al router y al layout compartido; cada ruta dibuja su página dentro de <code>Outlet</code>. Cada nodo corresponde a un archivo del proyecto.</p>
        </div>
      </section>

      <AnchorBar items={ANCHORS} label="Navegación interna del árbol" />

      <Section id="arbol" eyebrow="Componentes" title="Jerarquía de la aplicación">
        <div className="api-toolbar">
          <button className="btn btn-primary" type="button" onClick={() => apply(true)}>Expandir todo</button>
          <button className="btn btn-secondary" type="button" onClick={() => apply(false)}>Contraer todo</button>
        </div>
        <ul className="tree-root" key={view.version}>
          <ComponentTree node={tree} forceOpen={view.mode} />
        </ul>
      </Section>

      <Section id="como-leerlo" alt eyebrow="Guía" title="Cómo leerlo">
        <ul className="legend">
          <li><code>{'<Nombre />'}</code> es un componente; debajo se indica su archivo.</li>
          <li><span className="badge">prop · x</span> son las props que recibe del componente padre.</li>
          <li><span className="badge badge-hook">hook · x</span> son los hooks que usa (React, React Router o propios).</li>
          <li>Los componentes de React Router (<code>RouterProvider</code>, <code>Outlet</code>, <code>NavLink</code>, <code>Link</code>, <code>ScrollRestoration</code>) vienen de la librería y no tienen archivo propio.</li>
          <li>Las páginas se cargan con <code>lazy</code>: son hijas de <code>Outlet</code> según la URL, no se renderizan todas a la vez.</li>
        </ul>
      </Section>
    </>
  );
}
