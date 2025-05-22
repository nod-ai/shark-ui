import {
  fileURLToPath,
} from 'node:url';

import {
  mergeConfig,
  defineConfig,
  configDefaults,
} from 'vitest/config';

import viteConfig from './vite.config';

const vitestConfig = mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude    : [...configDefaults.exclude, 'e2e/**'],
      root       : fileURLToPath(new URL('./', import.meta.url)),
    },
  }),
);

export {
  vitestConfig as default,
};
