# TP2 - Eximia Code · Grupo 12

## Descripción

**Eximia Code** es una empresa ficticia de software para **logística inteligente B2B** (optimización de rutas, cadena de frío y trazabilidad). Este TP2 continúa el [TP1 del Grupo 12](https://github.com/fiorellaalarcon/tp1-grupo12) y lo lleva a una **Single Page Application en React 19.3** con React Router 8 y Vite 8.

Contiene: portada con demo interactiva, página del equipo, cinco perfiles reutilizables (habilidades, películas, discos con Spotify bajo demanda), catálogo JSON de 24 clientes con búsqueda y filtros, consumo de la API pública Open-Meteo, árbol de renderizado expandible, bitácora del TP1 y TP2 con filtros y un formulario de contacto único. Una sidebar compartida organiza toda la navegación.

**TP1 Grupo 12 - Eximia Code.** IFTS 29 · Tecnicatura Superior en Desarrollo de Software · Desarrollo de Sistemas Web (Front End) · 2.º A · Docente: Luciano Martínez · 2026.

## Sitio publicado

- Vercel: **https://tp2-grupo-12.vercel.app/** *; ver [Despliegue](#despliegue-en-github-y-vercel))*
- Repositorio: https://github.com/fiorellaalarcon/tp2-grupo12

## Integrantes

| Nombre y apellido | Perfil de GitHub |
| --- | --- |
| Fiorella Alarcón | https://github.com/fiorellaalarcon/ |
| Axel Alva | https://github.com/axelalva2023/ |
| Malena Jasque | https://github.com/malenajasque/ |
| Javier Churquina | https://github.com/Freddy1537/ |
| Selene Pais | https://github.com/Selepais/ |

## Uso de IA

| Aplicación utilizada | Modelo utilizado |
| --- | --- |
| Claude (claude.ai, de Anthropic) | Claude Sonnet 5.5 |
| Gemini (de Google) | Gemini (versión a confirmar por la persona que lo usó) |

La aplicación y el modelo son datos distintos. El detalle por integrante está en [Uso de IA por integrante](#uso-de-ia-por-integrante).

---

## Índice

- [Descripción](#descripción)
- [Sitio publicado](#sitio-publicado)
- [Integrantes](#integrantes)
- [Uso de IA](#uso-de-ia)
- [Capturas](#capturas)
- [Responsabilidades](#responsabilidades)
- [Uso de IA por integrante](#uso-de-ia-por-integrante)
- [Tecnologías y versiones (con justificación)](#tecnologías-y-versiones-con-justificación)
- [Requisitos previos, instalación y ejecución](#requisitos-previos-instalación-y-ejecución)
- [Despliegue en GitHub y Vercel](#despliegue-en-github-y-vercel)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Rutas de la aplicación](#rutas-de-la-aplicación)
- [Identidad visual](#identidad-visual)
- [Accesibilidad, teclado y responsive](#accesibilidad-teclado-y-responsive)
- [De TP1 a TP2: qué se conservó y qué mejoró](#de-tp1-a-tp2-qué-se-conservó-y-qué-mejoró)
- [Checklist de los 15 criterios](#checklist-de-los-15-criterios)
- [Colaboración, commits y Pull Requests](#colaboración-commits-y-pull-requests)

## Capturas

Capturas reales del proyecto publicado (agregar los archivos indicados en `docs/capturas/` antes de entregar):

| Pantalla | Archivo |
| --- | --- |
| Portada en escritorio (hero, panel a la derecha, demo) | `docs/capturas/tp2-01-portada.webp` |
| Sidebar y perfil de un integrante en escritorio | `docs/capturas/tp2-02-perfil.webp` |
| Menú móvil abierto (400 px) | `docs/capturas/tp2-03-menu-movil.webp` |
| Catálogo con búsqueda y filtros | `docs/capturas/tp2-04-catalogo.webp` |
| API pública (estados y datos) | `docs/capturas/tp2-05-api.webp` |
| Árbol de renderizado y bitácora | `docs/capturas/tp2-06-arbol-bitacora.webp` |

## Responsabilidades

| Integrante | Responsabilidad en el proyecto |
| --- | --- |
| Fiorella Alarcón | Product & Frontend: configuración del proyecto, tokens de diseño, tema con Context, sidebar, header, rutas con carga diferida y página 404. |
| Malena Jasque | UX/UI & QA: portada, demo interactiva, anchor bar con ScrollSpy, página del equipo, catálogo con búsqueda/filtro y responsive. |
| Javier Churquina | Data & Routing: perfil reutilizable desde `members.json`, películas clickeables, vinilo, Spotify bajo demanda y navegación entre perfiles. |
| Axel Alva | Backend Developer: formulario único con validación y envío AJAX, identificación por URL y consumo de la API pública con estados. |
| Selene Pais | DevOps & Docs: bitácora, árbol de renderizado, README, plan de commits, `vercel.json` y despliegue. |

## Uso de IA por integrante

| Integrante | Aplicación | Modelo | Contenido o tarea |
| --- | --- | --- | --- |
| Fiorella Alarcón | Claude | Claude Sonnet 5.5 | Generación y revisión del código de la base React, sidebar, tema y rutas; plan de commits y este README. |
| Fiorella Alarcón | Gemini | Gemini 4 Argon | Investigación de arquitectura (sidebar, header, formulario, menú hamburguesa, `members.json`). |
| Malena Jasque | Claude | Claude Sonnet 5.5 | Código de portada, demo, anchor bar, equipo y catálogo; ajuste de breakpoints. |
| Javier Churquina | Claude | Claude Sonnet 5.5 | Código del perfil reutilizable, vinilo y Spotify bajo demanda. |
| Axel Alva | Claude | Claude Sonnet 5.5 | Código del formulario único, validación y hook de la API. |
| Selene Pais | Claude | Claude Sonnet 5.5 | Código de bitácora y árbol de renderizado; datos documentales. |

> Las imágenes del proyecto (avatares, panel, pósters y portadas) son las del TP1; su declaración (ChatGPT con GPT-5.6 Luna y Nano Banana 2) y los prompts están en [`docs/IA-PROMPTS.md`](docs/IA-PROMPTS.md). **Cada integrante debe revisar que esta tabla refleje lo que realmente usó** y corregirla antes de entregar. Todo el código fue leído, ejecutado y adaptado por el equipo.

---

## Tecnologías y versiones (con justificación)

| Tecnología | Versión (fija) | Rol | Por qué esta versión |
| --- | --- | --- | --- |
| **React / React DOM** | **19.3.1** | Interfaz con componentes, props, children y hooks | Última versión estable de la serie 19.3. Incluye `<title>`/`<meta>` en componentes, `ref` como prop, `preload()` y `inert`, que se usan en el proyecto. |
| **React Router** | **8.5.1** | Rutas, `NavLink`, `Outlet`, `ScrollRestoration`, `lazy` | Paquete único `react-router` (los imports DOM salen de `react-router/dom`). Requiere Node 22.22 o superior. |
| **Vite** | **8.3.5** | Servidor de desarrollo y empaquetado | Herramienta oficial recomendada para React (Create React App está discontinuado). Compatible con Node 20.19+ y 22.12+. |
| **@vitejs/plugin-react** | **6.1.2** | JSX y Fast Refresh | Versión 6 requiere Vite 8. |
| **Oxlint** | **1.90.0** | Análisis estático (`npm run lint`) | Muy rápido, con reglas de React y accesibilidad (`jsx-a11y`). |
| **Node.js** | **22.22 o superior** (LTS) | Entorno de ejecución | Lo exige React Router 8; incluye `.nvmrc` y `engines`. Vercel lo usa con la versión de `engines`. |
| **JavaScript / JSX / CSS** | ES2022 | Lenguajes | JSON = contenido · JSX = estructura · CSS = estilos. Sin Bootstrap: el CSS propio del TP1 cubre todo, así no se agrega peso. |

**Criterio de compatibilidad:** las versiones se verificaron en el registro de npm (`engines` y `peerDependencies`) el 30/10/2026 y se **fijaron sin `^`** para que todo el equipo y Vercel instalen exactamente lo mismo. Esta combinación es la estable más reciente de cada pieza; no se usaron versiones *beta* ni *canary*. Decisiones sobre librerías: **sin Yup/Zod** (cuatro campos, validación propia más liviana), **sin librería de focus-trap** (se resuelve con ~20 líneas), **Fetch API nativa** (sin Axios), **FormSubmit por AJAX** (sin límite mensual, a diferencia de Formspree).

## Requisitos previos, instalación y ejecución

**Requisitos:** [Node.js](https://nodejs.org/) **22.22 o superior** (recomendado instalarlo con `nvm`), npm 10 o superior, Git y [GitHub Desktop](https://desktop.github.com/).

```bash
# 1. Clonar el repositorio
git clone https://github.com/fiorellaalarcon/tp2-grupo12.git
cd tp2-grupo12

# 2. Usar la versión de Node del proyecto (opcional, con nvm)
nvm install && nvm use

# 3. Instalar dependencias (usa package-lock.json: versiones exactas)
npm install

# 4. Desarrollo (http://localhost:5173)
npm run dev

# 5. Análisis estático y compilación de producción
npm run lint
npm run build

# 6. Probar el resultado de producción (http://localhost:4173)
npm run preview
```

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con recarga instantánea. |
| `npm run build` | Genera la carpeta `dist/` optimizada (minificada y con carga diferida por página). |
| `npm run preview` | Sirve `dist/` para probar la versión de producción. |
| `npm run lint` | Revisa el código con Oxlint (React + accesibilidad). |

**Dependencias:** `react`, `react-dom`, `react-router` (producción) · `vite`, `@vitejs/plugin-react`, `oxlint` (desarrollo). No hay otras.

## Despliegue en GitHub y Vercel

**GitHub**

1. En GitHub: *New repository* → nombre `tp2-grupo12`, **Public**, con descripción (la de este README).
2. *Settings → Collaborators → Add people*: invitar a Axel (`axelalva2023`), Malena (`malenajasque`), Javier (`Freddy1537`) y Selene (`Selepais`). **Cada persona debe aceptar la invitación.** Fiorella ya tiene acceso como propietaria.
3. Subir el proyecto siguiendo [`docs/PLAN-COMMITS.md`](docs/PLAN-COMMITS.md) (una rama `feat/nombre` y un Pull Request por integrante).
4. En *About* del repositorio, agregar la descripción y el enlace al sitio de Vercel.

**Vercel**

1. Entrar a [vercel.com](https://vercel.com) con GitHub → *Add New… → Project* → importar `tp2-grupo12`.
2. Vercel detecta **Vite** (lo confirma `vercel.json`): *Build Command* `npm run build`, *Output Directory* `dist`. No hay variables de entorno.
3. *Deploy*. Cada `push` a `main` redespliega automáticamente.
4. **Rutas internas:** `vercel.json` reescribe cualquier URL a `index.html`, por eso se puede abrir o recargar `/equipo/axel` directamente sin error 404.
5. Copiar la URL final en la sección *Sitio publicado* de este README y comprobar el sitio **sin iniciar sesión** (ventana privada).

## Estructura del proyecto

```text
tp2-grupo12/
├── index.html              # Documento base: fuentes, tema previo al render, #root
├── vite.config.js          # Vite 8 + plugin de React
├── vercel.json             # Rewrite SPA y caché de /assets e /img
├── package.json            # Versiones fijas y engines de Node
├── .oxlintrc.json · .nvmrc · .gitignore
├── public/img/             # Imágenes WebP (avatares 400/1200, panel, pósters, portadas)
├── docs/                   # PLAN-COMMITS.md · IA-PROMPTS.md · capturas/
└── src/
    ├── main.jsx · App.jsx  # Entrada, tema y tabla de rutas (lazy)
    ├── context/ThemeContext.jsx
    ├── layouts/RootLayout.jsx
    ├── components/         # Sidebar, AppHeader, Footer, Section, AnchorBar, TeamCard, AlbumCard…
    ├── pages/              # Home, Team, Profile, Catalog, ApiPage, RenderTree, Bitacora, Contact, NotFound
    ├── hooks/              # useMediaQuery, useScrollSpy, useOpenMeteo, useCommits
    ├── data/               # members.json · catalogo.json · bitacora.json · tree.json
    └── styles/             # 01-variables … 13-api (un archivo por responsabilidad, como en el TP1)
```

La sidebar y el pie quedan **fuera** de las páginas: `RootLayout` los dibuja una sola vez y `<Outlet />` muestra la página elegida. El árbol completo, con props y hooks de cada componente, está en la sección **Árbol de renderizado** de la aplicación (`src/data/tree.json`, verificado contra los imports del código).

## Rutas de la aplicación

| Ruta | Página |
| --- | --- |
| `/` | Portada: hero, panel, demo interactiva, equipo y CTA |
| `/equipo` | Presentación del equipo y responsabilidades |
| `/equipo/:slug` | Perfil reutilizable (`fiorella`, `axel`, `malena`, `javier`, `selene`) |
| `/recursos` | Recursos JSON: 24 clientes con búsqueda y filtros |
| `/api` | API pública Open-Meteo con carga, error y reintento |
| `/arbol` | Árbol de renderizado expandible |
| `/bitacora` | Bitácora TP1 + TP2 |
| `/contacto` | Formulario único (`?para=slug` identifica al integrante) |
| `*` | Página no encontrada |

## Identidad visual

Se conserva la identidad del TP1: paleta azul marino, verde petróleo, azul y turquesa con lógica **60-30-10**, modos claro y oscuro con las mismas variables CSS (`01-variables.css`) y contraste **WCAG 2.1 AA**. Tipografías: **Orbitron** (marca y `h1`), **Space Grotesk** (encabezados) e **IBM Plex Sans** (texto), cargadas desde Google Fonts. Íconos Devicon y SVG propios (Figma multicolor; GitHub y Kafka cambian a negro/blanco según el tema).

El tema respeta: 1) la elección guardada (`localStorage`, clave `eximia-theme`, compartida con el TP1), 2) la preferencia del sistema y 3) el modo claro. Se comparte con `React Context` y se sincroniza entre pestañas. Los avatares, el panel, los pósters y las portadas son las imágenes generadas y editadas para el proyecto en el TP1.

## Accesibilidad, teclado y responsive

- **Sidebar:** `NavLink` marca la página activa (`aria-current="page"`); en ≤ 900 px es un panel con botón hamburguesa (`aria-expanded`, `aria-controls`), `Esc` para cerrar, foco atrapado, fondo inerte y *backdrop*.
- **Foco en cada cambio de ruta** al `<h1>` y *skip-link* al contenido principal.
- **Anchor bar sticky** bajo el header con `aria-current="location"` (ScrollSpy con `useEffect` y `requestAnimationFrame`).
- **Tarjetas completamente clickeables** (un solo enlace por tarjeta), películas clickeables y catálogo con botones `aria-expanded`.
- **Formulario:** etiquetas, `aria-invalid`, mensajes con `aria-describedby`, estados anunciados y envío AJAX.
- **Preferencias:** `prefers-reduced-motion`, `prefers-contrast`, `forced-colors`, `prefers-color-scheme` e impresión (`09-accesibilidad.css`).
- **Rendimiento:** páginas con `lazy` (code splitting), imagen principal con `fetchPriority="high"` y `preload()`, el resto con `loading="lazy"`, `width`/`height` para evitar saltos, Spotify sólo al pulsar ▶ y se detiene al cambiar de página.
- **Responsive 400 / 900 / 1200 px** sin desplazamiento horizontal (`overflow-x: clip`, `min-width: 0`, tarjetas con ancho máximo del TP1).

## De TP1 a TP2: qué se conservó y qué mejoró

| Aspecto | TP1 (HTML + CSS + JS) | TP2 (React 19.3) |
| --- | --- | --- |
| Páginas | 7 HTML con código repetido; recarga completa al navegar | SPA: una sola carga y rutas con React Router |
| Perfiles | 5 HTML casi idénticos | 1 componente `Profile` + `members.json` |
| Navegación | Menú en cada página | Sidebar y header compartidos en `RootLayout` |
| Interacciones | 8 archivos JS por página | Componentes con hooks (`RoleDemo`, `RouteDemo`, `AlbumCard`…) |
| Formularios | 6 (uno por perfil y uno grupal) | 1 formulario con selector de destinatario |
| Bitácora | HTML estático | Filtros, desplegables y carga progresiva, con el mismo formato documental |
| Datos | Dentro del HTML | JSON local importado (4 archivos) |

Se **conservaron**: paleta, tipografías, modo claro/oscuro, imágenes, estructura de cada perfil, anchor bar, Spotify bajo demanda, formato de la bitácora, commits convencionales y la ausencia de desborde horizontal.

## Checklist de los 15 criterios

| # | Criterio | Dónde se cumple (nivel Propone / Supera) |
| --- | --- | --- |
| 1 | Repositorio y publicación | Repositorio público con descripción y enlace al sitio; deploy en Vercel. |
| 2 | README | Cuatro elementos + índice con enlaces + capturas. |
| 3 | Acceso al repositorio | Invitaciones a los 5; responsabilidades en este README. |
| 4 | React | Componentes y un mismo componente con distintos datos por props (`TeamCard`, `SkillCard`, `Section`…). |
| 5 | Sidebar compartida | Identidad, enlaces, sección activa y panel móvil que abre y cierra. |
| 6 | Navegación completa | Sidebar, migas, botones y 404; recarga directa de cada URL (rewrite de Vercel). |
| 7 | Portada | Hero, panel, demo interactiva y acceso a perfiles. |
| 8 | Perfiles | 5 perfiles internos, cada uno con interacción (`RoleDemo`). |
| 9 | Estética (**Supera**) | Identidad integral coherente en portada, perfiles y demás secciones; imágenes generadas y editadas para el proyecto; vinilo, demo y tema propios. |
| 10 | JSON local | 24 registros con detalle desplegable. |
| 11 | Búsqueda y filtro | Texto + tipo + país, mensaje sin resultados y restablecer. |
| 12 | API pública | Open-Meteo con carga, error, actualizar y reintentar. |
| 13 | Árbol | Esquema real con expandir/contraer. |
| 14 | Bitácora | Desplegables y filtros funcionales. |
| 15 | IA | Aplicación, modelo y tarea por integrante. |

## Colaboración, commits y Pull Requests

Una rama `feat/nombre-integrante` por persona, Pull Request hacia `main` y **commits convencionales** con título y descripción. El orden, los archivos y las descripciones de cada commit están en [`docs/PLAN-COMMITS.md`](docs/PLAN-COMMITS.md); la trazabilidad (decisiones, problemas, commits y PR) está en la sección **Bitácora** de la aplicación.
