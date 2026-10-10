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

- Proyectos: `src/data/projects.ts`
- Navegación y metadatos: `src/data/site.ts`
- Páginas: `src/pages/`
- Diseño: `src/styles/global.css`

Los enlaces a repositorios específicos, demos y releases se incorporan al confirmar sus destinos públicos. No se muestran enlaces o métricas inventados. Las fichas de proyecto son contenido editorial mantenido en el repositorio.
