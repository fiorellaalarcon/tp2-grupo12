/**
 * EXIMIA CODE · Punto de entrada de React 19.3
 * Importa los estilos (un archivo por responsabilidad, igual que en el TP1)
 * y monta <App /> dentro de <StrictMode> para detectar efectos mal limpiados en desarrollo.
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

import './styles/01-variables.css';
import './styles/02-base.css';
import './styles/03-layout.css';
import './styles/04-portada.css';
import './styles/05-perfil.css';
import './styles/06-formularios.css';
import './styles/07-bitacora.css';
import './styles/08-responsive.css';
import './styles/10-perfil-extra.css';
import './styles/11-recursos.css';
import './styles/12-arbol-bitacora.css';
import './styles/13-api.css';
import './styles/09-accesibilidad.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
