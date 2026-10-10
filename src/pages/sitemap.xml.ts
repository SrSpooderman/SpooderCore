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
  const urls = paths.map((path) => `  <url><loc>${base}${path}</loc></url>`).join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`,
    {
      headers: { 'Content-Type': 'application/xml; charset=utf-8' },
    },
  );
};
