/**
 * EXIMIA CODE · Tarjeta de cliente del catálogo (desplegable y clickeable)
 * Toda la parte superior es un <button> (área grande de toque). Al activarlo se despliega
 * el detalle del registro (criterio 10 · Propone). aria-expanded + aria-controls informan el estado.
 */
import { useId, useState } from 'react';
import Icon from './Icon.jsx';

const numberFormat = new Intl.NumberFormat('es-AR');

export default function CatalogCard({ item }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <article className={open ? 'catalog-card is-open' : 'catalog-card'}>
      <button className="catalog-toggle" type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((value) => !value)}>
        <span className="catalog-main">
          <span className="badge">{item.tipo}</span>
          <strong className="catalog-name">{item.nombre}</strong>
          <span className="muted">{item.ciudad}, {item.pais} · cliente desde {item.desde}</span>
        </span>
        <span className="catalog-chevron"><Icon name="chevron" /><span className="sr-only">{open ? 'Ocultar detalle' : 'Ver detalle'}</span></span>
      </button>
      {/* El panel sólo se renderiza abierto: el DOM inicial es liviano. */}
      {open && (
        <dl id={panelId} className="catalog-detail">
          <div><dt>Servicio contratado</dt><dd>{item.servicio}</dd></div>
          <div><dt>Tecnología</dt><dd>{item.tecnologia}</dd></div>
          <div><dt>Entregas por mes</dt><dd>{numberFormat.format(item.entregasMensuales)}</dd></div>
          <div className="full"><dt>Caso de uso</dt><dd>{item.descripcion}</dd></div>
        </dl>
      )}
    </article>
  );
}
