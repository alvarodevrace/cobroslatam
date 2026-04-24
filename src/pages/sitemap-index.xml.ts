import { getCollection } from 'astro:content';

export async function GET() {
  const base = 'https://cobroslatam.com';
  const staticPages = [
    '',
    '/herramientas/calculadora-comisiones',
    '/herramientas/calculadora-neto-objetivo',
    '/herramientas/comparador-plataformas',
    '/herramientas/calculadora-precio-freelance',
    '/herramientas/generador-cotizacion',
    '/blog',
    '/privacidad',
  ];
  const posts = await getCollection('blog');
  const pages = [
    ...staticPages,
    ...posts.map((post) => `/blog/${post.slug}`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${base}${p}</loc></url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
