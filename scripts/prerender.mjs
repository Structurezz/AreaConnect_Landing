// Build-time prerender: turns the client-side SPA into one static HTML file
// per route so Google, WhatsApp, LinkedIn, etc. see each page's real content,
// title, description, canonical and Open Graph tags without running JS.
//
// Runs after `vite build` (client → dist/) and
// `vite build --ssr src/entry-server.jsx` (server bundle → dist-ssr/).
// Also writes sitemap.xml so it can never drift from the route list.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root    = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist    = path.join(root, 'dist');
const ssrDir  = path.join(root, 'dist-ssr');
const SITE    = 'https://areaconnect.pro';

// Every indexable route. Keep in sync with <Routes> in src/App.jsx.
const ROUTES = [
  { path: '/',         changefreq: 'weekly',  priority: '1.0' },
  { path: '/features', changefreq: 'monthly', priority: '0.9' },
  { path: '/pricing',  changefreq: 'monthly', priority: '0.9' },
  { path: '/admin',    changefreq: 'monthly', priority: '0.8' },
  { path: '/mates',    changefreq: 'monthly', priority: '0.8' },
  { path: '/guard',    changefreq: 'monthly', priority: '0.8' },
  { path: '/about',    changefreq: 'monthly', priority: '0.7' },
  { path: '/contact',  changefreq: 'monthly', priority: '0.7' },
  { path: '/blog',     changefreq: 'weekly',  priority: '0.7' },
  { path: '/security', changefreq: 'monthly', priority: '0.6' },
  { path: '/careers',  changefreq: 'monthly', priority: '0.5' },
  { path: '/press',    changefreq: 'monthly', priority: '0.5' },
  { path: '/privacy',  changefreq: 'yearly',  priority: '0.3' },
  { path: '/terms',    changefreq: 'yearly',  priority: '0.3' },
  { path: '/cookies',  changefreq: 'yearly',  priority: '0.3' },
];

const entry = fs.readdirSync(ssrDir).find(f => /^entry-server\.m?js$/.test(f));
const { render } = await import(pathToFileURL(path.join(ssrDir, entry)).href);
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

if (!template.includes('<!--app-head-->') || !template.includes('<div id="root"></div>')) {
  throw new Error('prerender: index.html is missing <!--app-head--> or <div id="root"></div>');
}

function renderPage(url) {
  const { html, head } = render(url);
  return template
    .replace('<!--app-head-->', head)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
}

// "/" → index.html, "/pricing" → pricing.html. Flat .html files are served at
// the extension-less URL by Netlify and Cloudflare Pages without a redirect.
for (const { path: route } of ROUTES) {
  const file = route === '/' ? 'index.html' : `${route.slice(1)}.html`;
  fs.writeFileSync(path.join(dist, file), renderPage(route));
  console.log(`  prerendered ${route.padEnd(10)} → dist/${file}`);
}

// Real 404 page (served with a 404 status by the host for unknown URLs).
fs.writeFileSync(path.join(dist, '404.html'), renderPage('/__not-found__'));
console.log('  prerendered 404        → dist/404.html');

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(r => `  <url><loc>${SITE}${r.path}</loc><lastmod>${today}</lastmod><changefreq>${r.changefreq}</changefreq><priority>${r.priority}</priority></url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
console.log(`  sitemap.xml with ${ROUTES.length} URLs`);

fs.rmSync(ssrDir, { recursive: true, force: true });
