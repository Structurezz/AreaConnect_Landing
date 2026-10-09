import { defineConfig } from 'vite';
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

export default defineConfig({
  plugins: [react(), emitVersionFile()],
  define: {
    __APP_VERSION__: JSON.stringify(BUILD_VERSION),
  },
});
