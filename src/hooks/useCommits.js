/**
 * EXIMIA CODE · Historial verificable de commits (migrado de js/bitacora.js)
 * Consulta la API de GitHub para las ramas de cada repositorio y conserva el historial de la bitácora
 * (instantánea) si GitHub no responde. Se pide sólo cuando la persona lo solicita (`load`).
 * Estados por etapa: 'idle' | 'loading' | 'ok' | 'error'.
 */
import { useCallback, useState } from 'react';

const REPOS = { TP1: 'fiorellaalarcon/tp1-grupo12', TP2: 'fiorellaalarcon/tp2-grupo12' };
const BRANCHES = ['main', 'feat/fiorella', 'feat/malena', 'feat/javier', 'feat/axel', 'feat/selene'];
const TIME_ZONE = 'America/Argentina/Buenos_Aires';
const PERSONAS = [
  { nombre: 'Fiorella Alarcón', claves: ['fiorella', 'alarcon'] },
  { nombre: 'Axel Alva', claves: ['axel', 'alva'] },
  { nombre: 'Malena Jasque', claves: ['malena', 'jasque'] },
  { nombre: 'Javier Churquina', claves: ['javier', 'churquina', 'freddy', 'beboaven'] },
  { nombre: 'Selene Pais', claves: ['selene', 'pais', 'selepais'] }
];
const TIPOS = { feat: 'Función', style: 'Estilos', docs: 'Documentación', chore: 'Estructura', fix: 'Corrección', refactor: 'Reorganización', perf: 'Rendimiento', test: 'Pruebas' };

/* Reconoce a la persona por nombre, email o usuario del commit. */
function reconocer(nombre, email, login) {
  const clave = `${nombre} ${email} ${login}`.toLowerCase();
  return PERSONAS.find((p) => p.claves.some((c) => clave.includes(c)))?.nombre ?? nombre;
}

/* Clasifica por el prefijo del commit convencional (feat:, style:, docs:...). */
function clasificar(asunto) {
  if (/^Merge (pull request|branch)/.test(asunto)) return 'Integración';
  const match = asunto.match(/^(\w+)(\([^)]*\))?!?:/);
  return (match && TIPOS[match[1].toLowerCase()]) || 'Cambio';
}

const formatear = (iso) =>
  new Intl.DateTimeFormat('es-AR', { timeZone: TIME_ZONE, day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(new Date(iso)).replace(',', '');

export default function useCommits() {
  const [live, setLive] = useState({});
  const [status, setStatus] = useState({});

  const load = useCallback(async (etapa) => {
    const repo = REPOS[etapa];
    if (!repo) return;
    setStatus((s) => ({ ...s, [etapa]: 'loading' }));
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    try {
      const results = await Promise.allSettled(
        BRANCHES.map((rama) =>
          fetch(`https://api.github.com/repos/${repo}/commits?per_page=100&sha=${encodeURIComponent(rama)}`, { headers: { Accept: 'application/vnd.github+json' }, signal: controller.signal })
            .then((r) => { if (!r.ok) throw new Error(`GitHub respondió ${r.status}`); return r.json(); })
            .then((list) => list.map((c) => ({ c, rama })))
        )
      );
      /* Si la rama principal falla (repo inexistente, límite de uso) se conserva la instantánea. */
      if (results[0].status !== 'fulfilled') throw new Error('No se pudo leer main');
      const seen = new Set();
      const commits = [];
      for (const result of results) {
        if (result.status !== 'fulfilled') continue;
        for (const { c, rama } of result.value) {
          if (seen.has(c.sha)) continue;
          seen.add(c.sha);
          const [asunto, ...resto] = (c.commit.message || '').split('\n');
          commits.push({
            etapa, sha: c.sha.slice(0, 7), iso: c.commit.author.date, fecha: formatear(c.commit.author.date),
            persona: reconocer(c.commit.author.name, c.commit.author.email, c.author?.login ?? ''),
            tipo: clasificar(asunto), titulo: asunto || 'Cambio sin título', descripcion: resto.join('\n').trim() || 'El mensaje no contiene una descripción adicional; el título identifica el cambio realizado.',
            url: c.html_url, rama
          });
        }
      }
      commits.sort((a, b) => new Date(a.iso) - new Date(b.iso));
      setLive((l) => ({ ...l, [etapa]: commits }));
      setStatus((s) => ({ ...s, [etapa]: 'ok' }));
    } catch {
      setStatus((s) => ({ ...s, [etapa]: 'error' }));
    } finally {
      clearTimeout(timer);
    }
  }, []);

  return { live, status, load };
}
