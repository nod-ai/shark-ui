import type {
  Linter,
} from 'eslint';

import uncustomizedPluginJSONC from 'eslint-plugin-jsonc';

const rulesForPackageJSON: Linter.Config = {
  name : 'amd-shark-ui/jsonc/package-json',
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

const pluginJSONC: Linter.Config[] = [
  ...uncustomizedPluginJSONC.configs['flat/recommended-with-json'],
  {
    name   : 'amd-shark-ui/jsonc/ignore-generated',
    ignores: [
      '**/package-lock.json',
      '**/coverage/**',
      '**/.vite/**',
    ],
  },
  {
    name : 'amd-shark-ui/jsonc/rules',
    files: jsonPatterns,
    rules: {
      'jsonc/array-bracket-newline': [
        'error',
        {
          minItems: 1,
        }, // Mirrors configuration specified in "eslint.stylistic.ts"
      ],
      'jsonc/array-element-newline': [
        'error',
        {
          minItems: 1,
        }, // Mirrors configuration specified in "eslint.stylistic.ts"
      ],
      'jsonc/indent': [
        'error',
        2,
      ],
    },
  },
  rulesForPackageJSON,
];

export {
  pluginJSONC as default,
  jsonPatterns,
};
