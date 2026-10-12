import type { APIRoute } from 'astro';
import { projects } from '../data/projects';
import { locales, localizedPath, type Locale } from '../i18n/locales';

export const GET: APIRoute = () => {
  const base = 'https://www.spoodercore.com';
  const paths = [
    '/',
    '/projects',
    ...projects.map(({ slug }) => `/projects/${slug}`),
    '/downloads',
    '/lab',
    '/demos',
  ];
  const urls = paths
    .flatMap((path) => {
      const alternates = locales.map((locale) => ({
        locale,
        url: `${base}${localizedPath(locale as Locale, path)}`,
      }));
      return alternates.map(({ url }) => {
        const links = alternates
          .map(
            (alternate) =>
              `<xhtml:link rel="alternate" hreflang="${alternate.locale}" href="${alternate.url}"/>`,
          )
          .join('');
        return `  <url><loc>${url}</loc>${links}</url>`;
      });
    })
    .join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>`,
    {
      headers: { 'Content-Type': 'application/xml; charset=utf-8' },
    },
  );
};
