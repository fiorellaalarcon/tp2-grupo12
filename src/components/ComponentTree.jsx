/**
 * EXIMIA CODE · Árbol de componentes expandible (recursivo)
 * Cada nodo muestra componente, archivo, props y hooks. Si tiene hijos, el botón lo expande/contrae
 * (aria-expanded + aria-controls). `forceOpen` permite "Expandir todo" / "Contraer todo" desde la página.
 */
import { useId, useState } from 'react';
import Icon from './Icon.jsx';

export default function ComponentTree({ node, depth = 0, forceOpen = null }) {
  const [open, setOpen] = useState(forceOpen ?? depth < 2);
  const listId = useId();
  const hasChildren = Boolean(node.children?.length);

  return (
    <li className="tree-node">
      <div className="tree-row">
        {hasChildren ? (
          <button className={open ? 'tree-toggle is-open' : 'tree-toggle'} type="button" aria-expanded={open} aria-controls={listId} onClick={() => setOpen((value) => !value)}>
            <Icon name="chevron" size={16} />
            <code>{`<${node.name} />`}</code>
          </button>
        ) : (
          <span className="tree-leaf"><code>{`<${node.name} />`}</code></span>
        )}
        <span className="tree-file">{node.file}</span>
      </div>
      <p className="tree-desc">{node.descripcion}</p>
      {(node.props?.length > 0 || node.hooks?.length > 0) && (
        <p className="tree-meta">
          {node.props?.map((p) => <span key={p} className="badge">prop · {p}</span>)}
          {node.hooks?.map((h) => <span key={h} className="badge badge-hook">hook · {h}</span>)}
        </p>
      )}
      {hasChildren && open && (
        <ul id={listId} className="tree-children">
          {node.children.map((child) => <ComponentTree key={`${child.name}-${child.file}`} node={child} depth={depth + 1} forceOpen={forceOpen} />)}
        </ul>
      )}
    </li>
  );
}
