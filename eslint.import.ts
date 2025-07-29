import importPlugin from 'eslint-plugin-import';

import type {
  ConfigWithExtends,
} from 'typescript-eslint';

const extraConfig: ConfigWithExtends = {
  name    : 'shark-ui/import',
  files   : ['**/*.{ts,vue}'],
  settings: {
    'import/resolver': {
      'typescript'                         : true,
      'node'                               : true,
      'eslint-import-resolver-custom-alias': {
        alias: {
          '@': './src',
        },
        extensions: ['.ts', '.vue'],
      },
    },
  },
  rules: {
    'import/exports-last': [
      'error', // Encourages decoupling the export of a module from its declaration, which leads to cleaner diffs
    ],
    'import/group-exports': [
      'error', // Encourages decoupling the export of a module from its declaration, which leads to cleaner diffs
    ],
    'import/order': [
      'error',
      {
        'groups': [
          'builtin',
          'external',
          'parent',
          'sibling',
          'index',
        ],
        'pathGroups': [
          {
            pattern : '@/library/vue{,/**}', // Allows Vue utilities to bubble to the very top of the <script setup> tag
            group   : 'builtin',
            position: 'before',
          },
          {
            pattern : '@/library/**', // Treats our "internal dependencies" as somewhere between an external dependencies and internal business logic"
            group   : 'external',
            position: 'after',
          },
          {
            pattern : '@/!(features)/**', // Highlights the supporting logic of the application
            group   : 'external',
            position: 'after',
          },
          {
            pattern : '@/features/**', // Highlights the business logic of the application
            group   : 'external',
            position: 'after',
          },
        ],
        'newlines-between'  : 'always-and-inside-groups',
        'consolidateIslands': 'inside-groups',
        'alphabetize'       : {
          order: 'asc',
        },
      },
    ],
  },
};

const pluginImport: ConfigWithExtends[] = [
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  extraConfig,
];

export {
  pluginImport as default,
};
