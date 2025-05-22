import {
  fileURLToPath,
  URL,
} from 'node:url';

import vue from '@vitejs/plugin-vue';

import {
  defineConfig,
} from 'vite';

import vueDevTools from 'vite-plugin-vue-devtools';
import vuetify from 'vite-plugin-vuetify';

// https://vite.dev/config/
const viteConfig = defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    vuetify({
      // Prefer explicit imports because
      // a) it keeps dev server snappier when paired with explicit component imports
      // b) it makes usage easier to track (and therefore rip out if needed)
      // c) it keeps package size top-of-mind
      autoImport: false,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});

export {
  viteConfig as default,
};
