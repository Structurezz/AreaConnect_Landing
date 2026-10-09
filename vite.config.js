import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

const BUILD_VERSION = String(Date.now());

function emitVersionFile() {
  return {
    name: 'emit-version-file',
    apply: 'build',
    closeBundle() {
      const out = path.resolve('dist/version.json');
      fs.mkdirSync(path.dirname(out), { recursive: true });
      fs.writeFileSync(
        out,
        JSON.stringify({ version: BUILD_VERSION, builtAt: new Date().toISOString() }),
      );
    },
  };
}

// Replaces the <!--GOOGLE_TAGS_HERE--> placeholder in index.html with:
//   - a <meta name="google-site-verification"> tag when VITE_GOOGLE_SITE_VERIFICATION is set
//   - the GA4 gtag.js snippet when VITE_GA_MEASUREMENT_ID is set
// Either/both can be empty — the placeholder is replaced with the HTML
// comment itself (invisible) and nothing extra is emitted. This way the
// shipped HTML always validates.
function injectGoogleTags(env) {
  return {
    name: 'inject-google-tags',
    transformIndexHtml(html) {
      const parts = [];
      const verify = (env.VITE_GOOGLE_SITE_VERIFICATION || '').trim();
      const gaId   = (env.VITE_GA_MEASUREMENT_ID || '').trim();

      if (verify) {
        parts.push(`    <meta name="google-site-verification" content="${verify}" />`);
      }
      if (gaId) {
        parts.push(
`    <!-- Google Analytics 4 -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${gaId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}', { anonymize_ip: true });
    </script>`
        );
      }
      const injected = parts.join('\n');
      return html.replace('<!--GOOGLE_TAGS_HERE-->', injected || '<!-- google tags: none configured -->');
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), emitVersionFile(), injectGoogleTags(env)],
    define: {
      __APP_VERSION__: JSON.stringify(BUILD_VERSION),
      __GA_MEASUREMENT_ID__: JSON.stringify((env.VITE_GA_MEASUREMENT_ID || '').trim()),
      __ANALYTICS_API_URL__: JSON.stringify(
        (env.VITE_ANALYTICS_API_URL || env.VITE_API_URL || 'https://areaconnectapi-production.up.railway.app/api').trim()
      ),
    },
  };
});
