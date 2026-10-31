# Plan de commits, ramas y Pull Requests · TP2 · Grupo 12

> Implementación el **30 de octubre de 2026** (planificación: 25 al 29 de octubre). Cada integrante trabaja en su rama `feat/nombre`, sube sus commits **en el orden indicado** y abre un Pull Request hacia `main`. El siguiente integrante empieza cuando el PR anterior fue integrado.

## Reglas del equipo

- Commits convencionales: `feat:`, `style:`, `docs:`, `chore:`, `fix:` (igual que en el TP1).
- **Título** = primera línea. **Descripción** = cuerpo del commit en GitHub Desktop (qué se agrega, qué se incorpora y por qué es importante).
- Un commit = un cambio coherente. Antes de cada PR: `npm run lint` y `npm run build` sin errores.
- Cada PR se revisa por otra persona del equipo (revisión cruzada) antes de integrarlo con *Squash and merge* o *Merge*, según acuerde el equipo.

## Orden de integración (por dependencias)

| Orden | Integrante | Rama | Por qué va en ese lugar |
| --- | --- | --- | --- |
| 1 | Fiorella Alarcón | `feat/fiorella` | Crea la base (config, tema, layout, rutas) de la que dependen todos. |
| 2 | Malena Jasque | `feat/malena` | Aporta `AnchorBar`, `Section` ya existe, portada y equipo; los perfiles reutilizan `AnchorBar`. |
| 3 | Javier Churquina | `feat/javier` | Perfiles: necesitan layout, `Section` y `AnchorBar`. |
| 4 | Axel Alva | `feat/axel` | Formulario y API: los perfiles enlazan a `/contacto?para=slug`. |
| 5 | Selene Pais | `feat/selene` | Árbol, bitácora y README documentan lo ya integrado; luego despliega en Vercel. |

## Archivos compartidos (qué agrega cada PR)

`src/main.jsx` (importaciones de CSS) y `src/App.jsx` (tabla de rutas) los crea Fiorella con **todas** las líneas finales. En su rama, cada integrante deja funcionando sólo lo suyo: si al compilar falta un archivo de otra persona, comente temporalmente esa línea de importación o de ruta y **descomente** al integrar. Si aparece un conflicto en esos dos archivos, se resuelve conservando ambas líneas (práctica de resolución de conflictos).

## Pasos en GitHub Desktop (para cada integrante)

1. `Repository → Pull` en `main` para traer lo último.
2. `Branch → New branch…` con el nombre `feat/su-nombre` (basada en `main`).
3. Copie a la carpeta del repositorio **sólo los archivos del commit** que va a subir.
4. En *Changes* tilde únicamente esos archivos, escriba el **título** y la **descripción** del plan y pulse `Commit to feat/su-nombre`.
5. Repita para cada commit en orden. Al terminar: `Push origin`.
6. `Branch → Create Pull Request`, use el título y la descripción del PR y pida revisión.

## 1. Fiorella Alarcón · `feat/fiorella`

**Pull Request:** `feat: estructura base React 19.3 + Vite 8, sidebar, header y tema`  
**Descripción del PR:** Configura el proyecto, migra los tokens, agrega ThemeContext, RootLayout, Sidebar, AppHeader, pie, rutas con carga diferida y página 404.

### Commit 1.1 — `chore: inicializa proyecto con React 19.3, React Router 8 y Vite 8`

**Archivos:** `package.json`, `package-lock.json`, `vite.config.js`, `vercel.json`, `.gitignore`, `.nvmrc`, `.oxlintrc.json`

**Descripción (para GitHub Desktop):**

```text
Se agrega: la configuración del proyecto y las versiones exactas.
Se incorpora: scripts dev/build/preview/lint, engines de Node, rewrite SPA de Vercel y Oxlint.
Importante: todo el equipo trabaja con el mismo entorno y Vercel resuelve las rutas internas al recargar.
```

### Commit 1.2 — `style: migra tokens de diseño, tipografías y recursos del TP1`

**Archivos:** `index.html`, `src/styles/01-variables.css`, `src/styles/02-base.css`, `src/styles/09-accesibilidad.css`, `public/img/`

**Descripción (para GitHub Desktop):**

```text
Se agrega: la identidad visual consistente del TP1 al proyecto de React.
Se incorpora: variables CSS claro/oscuro, Orbitron, Space Grotesk, IBM Plex Sans, imágenes WebP, recursos gráficos optimizados y reglas de accesibilidad. En index.html, se configuran los metadatos básicos del sitio (idioma, título, descripción y autor), el color del navegador, el favicon y las etiquetas Open Graph para compartir el proyecto en redes sociales. También se incorpora la inicialización del tema desde localStorage para evitar el parpadeo entre los modos claro y oscuro, junto con la precarga de conexiones para Google Fonts.
Importante: mantiene la paleta y el contraste WCAG AA con que se evaluó el TP1, los avatares de los perfiles y el panel web generados y personalizados con IA. Se decidió conservar la identidad visual de Eximia Code y adaptar sus recursos al nuevo proyecto, manteniendo la coherencia entre ambos trabajos y mejorando la legibilidad, la identificación y la presentación
```

### Commit 1.3 — `feat: incorpora tema claro/oscuro con React Context`

**Archivos:** `src/context/ThemeContext.jsx`, `src/hooks/useMediaQuery.js`, `src/components/ThemeToggle.jsx`, `src/components/Icon.jsx`

**Descripción (para GitHub Desktop):**

```text
Se agrega: el selector de tema y los íconos SVG.
Se incorpora: Context con localStorage, preferencia del sistema y sincronización entre pestañas.
Importante: conserva la elección de la persona sin parpadeo.
```

### Commit 1.4 — `feat: crea layout compartido con sidebar, header y pie`

**Archivos:** `src/layouts/RootLayout.jsx`, `src/components/Sidebar.jsx`, `src/components/AppHeader.jsx`, `src/components/Footer.jsx`, `src/components/Section.jsx`, `src/styles/03-layout.css`, `src/data/members.json`

**Descripción (para GitHub Desktop):**

```text
Se crea: una estructura de diseño compartida para mantener la misma organización visual y navegación en las distintas páginas de la aplicación.
Se incorpora: una barra lateral con NavLink para identificar la página activa, encabezado, migas de pan, pie de página y menú móvil con manejo de la tecla Escape y control del foco. la sidebar y el pie quedan fuera de las rutas: no se copian y pegan en cada página.  También se centralizan en members.json los datos de los cinco integrantes del equipo. Section recibe datos por props y el contenido como children.
Importante: se reutilizan componentes para evitar duplicaciones y mantener la coherencia entre páginas. La navegación compartida y las mejoras de accesibilidad facilitan el uso de la aplicación en distintos dispositivos. cumple los criterios de sidebar compartida y navegación completa, con menú de hamburguesa accesible: aria-expanded, Esc para cerrar, foco atrapado, fondo inerte y backdrop.
```

### Commit 1.5 — `feat: configura rutas con carga diferida y página 404`

**Archivos:** `src/main.jsx`, `src/App.jsx`, `src/pages/NotFound.jsx`

**Descripción (para GitHub Desktop):**

```text
Se agrega: el punto de entrada y la tabla de rutas. Se agrega: el punto de entrada y la tabla de rutas. Se incorpora: createBrowserRouter, carga diferida de páginas mediante route.lazy, HydrateFallback y una ruta comodín para las URL inexistentes. Importante: cada página se descarga sólo cuando se visita y una URL inexistente tiene salida. ThemeProvider comparte el tema claro/oscuro y RootLayout mantiene la barra lateral, el encabezado y el pie de página compartidos, renderizando cada página mediante Outlet. La carga diferida permite descargar el código de cada página cuando se necesita, mientras que RouterProvider habilita las funciones del enrutador, incluida la restauración del desplazamiento mediante ScrollRestoration.
```

## 2. Malena Jasque · `feat/malena`

**Pull Request:** `feat: portada, equipo y catálogo con búsqueda y filtros`  
**Descripción del PR:** Agrega portada con demo interactiva, anchor bar con ScrollSpy, tarjetas del equipo y catálogo JSON con búsqueda y filtros.

### Commit 2.1 — `style: incorpora estilos de portada y responsive 1200/900/400`

**Archivos:** `src/styles/04-portada.css`, `src/styles/08-responsive.css`

**Descripción (para GitHub Desktop):**

```text
Se agrega: los estilos de portada, tarjetas y breakpoints.
Se incorpora: hero, grilla del equipo con tarjetas de ancho original y media queries 1200, 900 y 400.
Importante: evita el desborde horizontal con la sidebar fija.
```

### Commit 2.2 — `feat: agrega anchor bar sticky con ScrollSpy`

**Archivos:** `src/components/AnchorBar.jsx`, `src/hooks/useScrollSpy.js`

**Descripción (para GitHub Desktop):**

```text
Se agrega: la navegación interna de cada página.
Se incorpora: listener de scroll con requestAnimationFrame y aria-current en la sección activa.
Importante: la persona sabe en qué parte está sin depender del color.
```

### Commit 2.3 — `feat: agrega demo interactiva Optimizar ruta`

**Archivos:** `src/components/RouteDemo.jsx`

**Descripción (para GitHub Desktop):**

```text
Se agrega: la demo mejorada de la portada.
Se incorpora: selección de zona y entregas, cálculo determinista y mapa SVG antes/después.
Importante: explica la propuesta de logística de forma interactiva.
```

### Commit 2.4 — `feat: construye portada y página del equipo con tarjetas clickeables`

**Archivos:** `src/pages/Home.jsx`, `src/pages/Team.jsx`, `src/components/TeamCard.jsx`, `src/components/GithubList.jsx`

**Descripción (para GitHub Desktop):**

```text
Se agrega: las pantallas de presentación.
Se incorpora: hero con panel.webp, CTA, tarjetas de un solo enlace y perfiles de GitHub.
Importante: cumple el criterio de portada con presentación propia.
```

### Commit 2.5 — `feat: agrega catálogo JSON con búsqueda y filtros`

**Archivos:** `src/data/catalogo.json`, `src/components/CatalogCard.jsx`, `src/pages/Catalog.jsx`, `src/styles/11-recursos.css`

**Descripción (para GitHub Desktop):**

```text
Se agrega: 24 clientes ficticios en una lista dinámica.
Se incorpora: búsqueda sin tildes, filtros por tipo y país, detalle desplegable, estado vacío y restablecer.
Importante: cumple los criterios de datos locales y búsqueda/filtro en nivel Propone.
```

## 3. Javier Churquina · `feat/javier`

**Pull Request:** `feat: perfiles reutilizables con Spotify bajo demanda`  
**Descripción del PR:** Incorpora la página de perfil reutilizable, componentes de habilidades, películas y discos, efecto de vinilo y reproducción de Spotify bajo demanda.

### Commit 3.1 — `style: migra estilos de perfil y efecto vinilo`

**Archivos:** `src/styles/05-perfil.css`, `src/styles/10-perfil-extra.css`

**Descripción (para GitHub Desktop):**

```text
Se agrega: los estilos de perfil, películas y discos.
Se incorpora: foto a la izquierda, tarjetas 2:3 y 1:1 y vinilo animado con prefers-reduced-motion.
Importante: mantiene las proporciones del TP1.
```

### Commit 3.2 — `feat: crea componentes de habilidades, películas y demo de rol`

**Archivos:** `src/components/SkillCard.jsx`, `src/components/MovieCard.jsx`, `src/components/RoleDemo.jsx`

**Descripción (para GitHub Desktop):**

```text
Se agrega: las piezas reutilizables del perfil.
Se incorpora: SkillCard con Figma/Kafka/GitHub, MovieCard clickeable y RoleDemo con frases por props.
Importante: un mismo componente sirve para cinco personas.
```

### Commit 3.3 — `feat: integra Spotify bajo demanda desde members.json`

**Archivos:** `src/components/AlbumCard.jsx`

**Descripción (para GitHub Desktop):**

```text
Se agrega: la reproducción dentro del cuadrado del disco.
Se incorpora: iframe creado al hacer clic con la URL de members.json y botón para cerrarlo.
Importante: carga liviana y la música se detiene al cambiar de página.
```

### Commit 3.4 — `feat: construye perfil reutilizable con navegación entre integrantes`

**Archivos:** `src/pages/Profile.jsx`, `src/components/ProfileNav.jsx`, `src/components/RestCard.jsx`

**Descripción (para GitHub Desktop):**

```text
Se agrega: la página /equipo/:slug.
Se incorpora: orden del TP1, anterior/inicio/siguiente circular y cuatro tarjetas del resto del equipo.
Importante: cumple el criterio de perfiles dentro de React con interacción.
```

## 4. Axel Alva · `feat/axel`

**Pull Request:** `feat: formulario único y consumo de Open-Meteo`  
**Descripción del PR:** Agrega formulario de contacto con validación y envío AJAX, identificación por URL y página de API pública con estados de carga, error y reintento.

### Commit 4.1 — `style: migra estilos de formularios`

**Archivos:** `src/styles/06-formularios.css`

**Descripción (para GitHub Desktop):**

```text
Se agrega: los estilos de campos, errores y estados.
Se incorpora: mensajes de éxito/error y foco visible.
Importante: los errores se distinguen por texto además del color.
```

### Commit 4.2 — `feat: crea formulario de contacto con validación y envío AJAX`

**Archivos:** `src/components/ContactForm.jsx`

**Descripción (para GitHub Desktop):**

```text
Se agrega: el formulario único.
Se incorpora: validación accesible, fetch a FormSubmit y selector de destinatario.
Importante: se envía sin recargar y comunica cada estado.
```

### Commit 4.3 — `feat: agrega página de contacto con identificación por URL`

**Archivos:** `src/pages/Contact.jsx`

**Descripción (para GitHub Desktop):**

```text
Se agrega: la pantalla /contacto.
Se incorpora: lectura de ?para=slug con useSearchParams.
Importante: un mensaje desde un perfil queda identificado y la URL sobrevive a una recarga.
```

### Commit 4.4 — `feat: crea hook useOpenMeteo con estados de carga y error`

**Archivos:** `src/hooks/useOpenMeteo.js`

**Descripción (para GitHub Desktop):**

```text
Se agrega: la lógica de consulta a la API.
Se incorpora: fetch, AbortController, tiempo máximo y refresh.
Importante: evita respuestas viejas y errores silenciosos.
```

### Commit 4.5 — `feat: agrega página de API pública con actualización y reintento`

**Archivos:** `src/pages/ApiPage.jsx`, `src/styles/13-api.css`

**Descripción (para GitHub Desktop):**

```text
Se agrega: el clima de 6 ciudades.
Se incorpora: mensaje de carga, mensaje de error, botón Reintentar y riesgo de cadena de frío.
Importante: cumple el criterio de API con estados en nivel Propone.
```

## 5. Selene Pais · `feat/selene`

**Pull Request:** `docs: bitácora, árbol de renderizado, README y despliegue`  
**Descripción del PR:** Incorpora la bitácora con filtros, el árbol de renderizado expandible, el README, el plan de commits y el despliegue en Vercel.

### Commit 5.1 — `style: migra estilos de bitácora y árbol de renderizado`

**Archivos:** `src/styles/07-bitacora.css`, `src/styles/12-arbol-bitacora.css`

**Descripción (para GitHub Desktop):**

```text
Se agrega: el formato documental del TP1.
Se incorpora: tarjetas, línea de tiempo, filtros y árbol.
Importante: conserva la jerarquía que se destacó en el TP1.
```

### Commit 5.2 — `feat: agrega árbol de renderizado expandible`

**Archivos:** `src/data/tree.json`, `src/components/ComponentTree.jsx`, `src/pages/RenderTree.jsx`

**Descripción (para GitHub Desktop):**

```text
Se agrega: el árbol de componentes del código real.
Se incorpora: nodos con archivo, props y hooks; expandir y contraer todo.
Importante: cumple el criterio de árbol en nivel Propone.
```

### Commit 5.3 — `feat: incorpora datos de la bitácora del TP1 y del TP2`

**Archivos:** `src/data/bitacora.json`, `src/components/RichText.jsx`

**Descripción (para GitHub Desktop):**

```text
Se agrega: los registros del proceso.
Se incorpora: etapas, problemas, commits, Pull Requests y pruebas de ambos trabajos.
Importante: mantiene la trazabilidad del TP1 y suma la del TP2.
```

### Commit 5.4 — `feat: crea bitácora con filtros, desplegables y commits por etapa`

**Archivos:** `src/components/LogEntry.jsx`, `src/hooks/useCommits.js`, `src/pages/Bitacora.jsx`

**Descripción (para GitHub Desktop):**

```text
Se agrega: la página de bitácora.
Se incorpora: búsqueda, filtros por etapa/tipo/etiqueta, registros desplegables, carga progresiva y commits bajo demanda.
Importante: cumple el criterio de bitácora con desplegables y filtros.
```

### Commit 5.5 — `docs: documenta README, uso de IA y plan de trabajo`

**Archivos:** `README.md`, `docs/`

**Descripción (para GitHub Desktop):**

```text
Se agrega: la documentación de entrega.
Se incorpora: README con índice, capturas, responsabilidades y uso de IA por integrante; plan de commits y prompts.
Importante: cubre los criterios 1, 2, 3 y 15 en nivel Propone.
```

## Cierre

1. Con los 5 PR integrados: `git pull`, `npm install`, `npm run lint`, `npm run build`.
2. Se importa el repositorio en Vercel (ver README) y verifica el enlace sin iniciar sesión.
3. Se completa el enlace de Vercel en el README y todos confirman que las invitaciones al repositorio están aceptadas.
