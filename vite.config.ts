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
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    vuetify({
      autoImport: false, // To keep the app agnostic to whatever component library, prefer wrapping vuetify components in a facade and importing that instead
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
