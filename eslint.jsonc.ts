import type {
  Linter,
} from 'eslint';

import pluginJsonc from 'eslint-plugin-jsonc';

const jsonPatterns = [
  '**/*.json',
];

const pluginJSON: Linter.Config[] = [
  ...pluginJsonc.configs['flat/recommended-with-json'],
  {
    name   : 'shark-ui/jsonc/ignore-generated',
    ignores: [
      '**/package-lock.json',
      '**/coverage/**',
      '**/.vite/**',
    ],
  },
];

export {
  pluginJSON as default,
  jsonPatterns,
};
