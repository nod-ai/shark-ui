import uncustomizedPluginImport from 'eslint-plugin-import';

import type {
  ConfigWithExtends,
} from 'typescript-eslint';

const extendedConfig: ConfigWithExtends = {
  name : 'amd-shark-ui/import',
  files: [
    '**/*.{ts,vue}',
  ],
  extends: [
    uncustomizedPluginImport.flatConfigs.recommended,
    uncustomizedPluginImport.flatConfigs.typescript,
  ],
  settings: {
    'import/resolver': {
      'typescript': {
        project: './tsconfig.json',
      },
      'eslint-import-resolver-custom-alias': {
        alias: {
          '@': './src',
        },
        extensions: [
          '.ts',
          '.vue',
        ],
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
    'import/no-useless-path-segments': [
      'error',
      {
        // 2025-July-29: Only works for relative paths, not absolute paths
        noUselessIndex: true, // Avoids noise in diffs from converting single-file modules <-> directory modules
      },
    ],
    'import/no-internal-modules': [
      'error',
      {
        allow: [
          '**/*.vue', // .vue files must be imported directly for bundler to enable type-safety
          '?(@)[a-z]*/**', // matches packages
          '@/*/*', // matches src modules
          '@/library/utilitiesByType/*', // bag of tools where consumer must pick a type
        ],
      },
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
            pattern : '@/!(features){,/**}', // Highlights the supporting logic of the application
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
  extendedConfig,
];

export {
  pluginImport as default,
};
