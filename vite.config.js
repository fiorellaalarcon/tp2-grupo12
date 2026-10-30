/**
 * EXIMIA CODE · Configuración de Vite 8
 * El plugin oficial de React habilita JSX y Fast Refresh.
 * Vite 8 exige Node 20.19+ o 22.12+; React Router 8 exige Node 22.22+ (ver README).
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    /* Cada página se carga como chunk aparte (React.lazy / route.lazy); 600 kB es un límite holgado. */
    chunkSizeWarningLimit: 600
  }
});
