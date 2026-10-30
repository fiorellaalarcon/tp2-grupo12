/**
 * EXIMIA CODE · Layout raíz (sidebar + header + pie compartidos)
 * - La sidebar y el pie quedan FUERA de las rutas: no se copian en cada página.
 * - <Outlet /> dibuja la página elegida por el router.
 * - <ScrollRestoration /> restaura/lleva el scroll al cambiar de ruta.
 * - Menú móvil accesible: aria-expanded, Esc para cerrar, foco atrapado, fondo inerte y backdrop.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router';
import Sidebar from '../components/Sidebar.jsx';
import AppHeader from '../components/AppHeader.jsx';
import Footer from '../components/Footer.jsx';
import useMediaQuery from '../hooks/useMediaQuery.js';

export default function RootLayout() {
  const { pathname } = useLocation();
  const isMobile = useMediaQuery('(max-width: 900px)');
  /* El estado guarda la ruta en que se abrió el menú: al cambiar de ruta o agrandar la ventana
     se considera cerrado sin necesidad de efectos (estado derivado). */
  const [menu, setMenu] = useState({ open: false, path: pathname });
  const menuOpen = menu.open && menu.path === pathname && isMobile;
  const setMenuOpen = (open) => setMenu({ open, path: pathname });
  const menuButtonRef = useRef(null);
  const mainRef = useRef(null);
  const firstRender = useRef(true);

  /* Cierra el panel; si se pide, devuelve el foco al botón hamburguesa (patrón esperado con teclado). */
  const closeMenu = useCallback((returnFocus = false) => {
    setMenu((current) => ({ ...current, open: false }));
    if (returnFocus) requestAnimationFrame(() => menuButtonRef.current?.focus());
  }, []);

  /* Al cambiar de página el foco pasa al <h1> (anuncia el cambio a lectores de pantalla). */
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    mainRef.current?.querySelector('h1')?.focus({ preventScroll: true });
  }, [pathname]);

  /* Mientras el panel está abierto: foco inicial, tecla Escape y ciclo de Tab dentro de la sidebar. */
  useEffect(() => {
    if (!menuOpen) return undefined;
    const sidebar = document.getElementById('sidebar');
    const focusables = () => Array.from(sidebar.querySelectorAll('a[href], button:not([disabled])'));
    focusables()[0]?.focus();

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        closeMenu(true);
        return;
      }
      if (event.key !== 'Tab') return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen, closeMenu]);

  /* Skip-link: enfoca el contenido principal sin alterar el orden natural de Tab. */
  function skipToContent(event) {
    event.preventDefault();
    const target = mainRef.current?.querySelector('h1') ?? mainRef.current;
    target?.focus({ preventScroll: true });
    target?.scrollIntoView({ block: 'start' });
  }

  return (
    <>
      <a className="skip-link" href="#contenido" onClick={skipToContent}>Saltar al contenido principal</a>

      <Sidebar isOpen={menuOpen} onClose={() => closeMenu(true)} onNavigate={() => closeMenu(false)} />
      {menuOpen && isMobile && (
        <button className="sidebar-backdrop" type="button" tabIndex={-1} aria-label="Cerrar menú" onClick={() => closeMenu(true)} />
      )}

      {/* `inert` impide interactuar con el fondo mientras el panel móvil está abierto. */}
      <div className="app-main" inert={menuOpen && isMobile}>
        <AppHeader menuOpen={menuOpen} onMenuToggle={() => (menuOpen ? closeMenu(true) : setMenuOpen(true))} buttonRef={menuButtonRef} />
        <main id="contenido" ref={mainRef}>
          <Outlet />
        </main>
        <Footer />
      </div>

      <ScrollRestoration />
    </>
  );
}
