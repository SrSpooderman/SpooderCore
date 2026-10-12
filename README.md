# SpooderCore

Portal público del ecosistema de software SpooderCore. Construido con Astro y TypeScript, con salida estática y contenido editorial versionado en Git.

## Desarrollo local

Requiere Node.js 24 o posterior.

```sh
npm install
npm run dev
```

## Producción

```sh
npm run build
npm run preview
```

La salida estática se genera en `dist/` y se puede servir desde cualquier hosting estático compatible, incluido Coolify.

## Docker

```sh
docker compose up --build -d
```

Abre `http://localhost:8080`. El puerto publicado y el puerto interno se configuran juntos con `PORT`, por ejemplo `PORT=4321 docker compose up --build -d`.

## Contenido

- Datos de proyectos y enlaces: `src/data/projects.ts`
- Plantillas reutilizables: `src/components/pages/`
- Rutas estáticas: `src/pages/`; el segmento `[locale]` genera las rutas prefijadas.
- Idioma predeterminado, idiomas disponibles y nombres: `src/i18n/config.json`
- Textos: `src/i18n/messages/<locale>/<sección>.json`. Cada idioma debe incluir los mismos grupos y claves.
- Comprobación de catálogos: `npm run check:i18n` (también se ejecuta al compilar).
- Estilos: `src/styles/`; `global.css` importa los módulos de diseño.

Las fichas de proyecto son contenido editorial mantenido en el repositorio. Las releases y el README se obtienen de GitHub durante la compilación. Las métricas del homelab usan el proxy `/api/metrics/summary` de Nginx.
