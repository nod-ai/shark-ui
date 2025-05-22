import {
  defineConfig,
} from 'cypress';

const cypressConfig = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    baseUrl    : 'http://localhost:4173',
  },
});

export {
  cypressConfig as default,
};
