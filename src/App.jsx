/**
 * EXIMIA CODE · Componente raíz y tabla de rutas
 *
 * - <ThemeProvider> comparte el tema claro/oscuro con toda la app (React Context).
 * - <RouterProvider> usa un "data router" (createBrowserRouter): es el que habilita <ScrollRestoration />.
 * - <RootLayout> contiene la sidebar, el header y el pie UNA sola vez; las páginas se
 *   dibujan en su <Outlet />. Así no se copia el menú en cada página.
 * - Cada página se importa con `lazy`: el navegador descarga su código recién al visitarla
 *   (carga diferida / code splitting).
 */
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { ThemeProvider } from './context/ThemeContext.jsx';
import RootLayout from './layouts/RootLayout.jsx';
import NotFound from './pages/NotFound.jsx';

/* Convierte un import dinámico en la forma que espera `lazy` de React Router. */
const page = (loader) => async () => ({ Component: (await loader()).default });

const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    /* Mientras se descarga el chunk de la primera página se muestra un aviso accesible. */
    HydrateFallback: () => <p role="status" className="route-loading">Cargando Eximia Code…</p>,
    children: [
      { index: true, lazy: page(() => import('./pages/Home.jsx')) },
      { path: 'equipo', lazy: page(() => import('./pages/Team.jsx')) },
      { path: 'equipo/:slug', lazy: page(() => import('./pages/Profile.jsx')) },
      { path: 'recursos', lazy: page(() => import('./pages/Catalog.jsx')) },
      { path: 'api', lazy: page(() => import('./pages/ApiPage.jsx')) },
      { path: 'arbol', lazy: page(() => import('./pages/RenderTree.jsx')) },
      { path: 'bitacora', lazy: page(() => import('./pages/Bitacora.jsx')) },
      { path: 'contacto', lazy: page(() => import('./pages/Contact.jsx')) },
      /* Ruta comodín: cualquier URL inexistente muestra la página 404 dentro del mismo layout. */
      { path: '*', Component: NotFound }
    ]
  }
]);

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
