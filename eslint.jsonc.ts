import type {
  Linter,
} from 'eslint';

import pluginJsonc from 'eslint-plugin-jsonc';

const rulesForPackageJSON: Linter.Config = {
  name : 'shark-ui/jsonc/package-json',
  files: [
    '**/package.json',
  ],
  rules: {
    'jsonc/sort-keys': [
      'error',
      {
        pathPattern: '^scripts$',
        order      : [
          'dev',
          'prepare',
          'lint',
          'lint:docs',
          'lint:json',
          'type-check',
          'build',
          'build-only',
          'preview',
          'test:unit',
          'test:e2e',
          'test:e2e:dev',
        ],
      },
    ],
  },
};

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
  {
    name : 'shark-ui/jsonc/rules',
    files: jsonPatterns,
    rules: {
      'jsonc/indent': [
        'error',
        2,
      ],
    },
  },
  rulesForPackageJSON,
];

export {
  pluginJSON as default,
  jsonPatterns,
};
