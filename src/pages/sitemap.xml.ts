import type { APIRoute } from 'astro';
import { projects } from '../data/projects';

export const GET: APIRoute = () => {
  const base = 'https://www.spoodercore.com';
  const paths = [
    '/',
    '/projects',
    ...projects.map(({ slug }) => `/projects/${slug}`),
    '/downloads',
    '/lab',
    '/demos',
    '/about',
  ];
  const urls = paths.flatMap((path) => {
    const englishPath = `/en${path === '/' ? '' : path}`;
    return [
      `  <url><loc>${base}${path}</loc><xhtml:link rel="alternate" hreflang="es" href="${base}${path}"/><xhtml:link rel="alternate" hreflang="en" href="${base}${englishPath}"/></url>`,
      `  <url><loc>${base}${englishPath}</loc><xhtml:link rel="alternate" hreflang="es" href="${base}${path}"/><xhtml:link rel="alternate" hreflang="en" href="${base}${englishPath}"/></url>`,
    ];
  }).join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>`,
    {
      headers: { 'Content-Type': 'application/xml; charset=utf-8' },
    },
  );
};
