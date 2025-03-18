import stylistic from '@stylistic/eslint-plugin';
import pluginVitest from '@vitest/eslint-plugin';
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from '@vue/eslint-config-typescript';
// @ts-expect-error https://github.com/cypress-io/eslint-plugin-cypress/issues/232
import pluginCypress from 'eslint-plugin-cypress/flat';
// @ts-expect-error https://github.com/import-js/eslint-plugin-import/pull/3097
import importPlugin from 'eslint-plugin-import';
import pluginVue from 'eslint-plugin-vue';
import tseslint, {
  type ConfigWithExtends,
} from 'typescript-eslint';

const importPluginConfigs: ConfigWithExtends[] = [
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  {
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
              pattern : '@/library/vue/**', // Allows Vue utilities to bubble to the very top of the <script setup> tag
              group   : 'builtin',
              position: 'before',
            },
            {
              pattern : '@/library/**', // Treats our "internal dependencies" as somewhere between an external dependencies and internal business logic"
              group   : 'external',
              position: 'after',
            },
            {
              pattern : '@/**', // Alias for "src/**"
              group   : 'internal',
              position: 'after',
            },
          ],
          'newlines-between': 'always-and-inside-groups',
          'alphabetize'     : {
            order: 'asc',
          },
        },
      ],
    },
  },
];

const configWithVueTS = defineConfigWithVueTs(
  ...importPluginConfigs,
  {
    name : 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name   : 'app/files-to-ignore',
    ignores: [
      '**/dist/**',
      '**/dist-ssr/**',
      '**/coverage/**',
    ],
  },

  {
    rules: {
      eqeqeq: 'error', // Avoids `==` and `!=`, which perform type coercions that follow the rather obscure Abstract Equality Comparison Algorithm: https://www.ecma-international.org/ecma-262/5.1/#sec-11.9.3
    },
  },

  stylistic.configs.customize({
    commaDangle: 'always-multiline',
    quotes     : 'single',
    semi       : true,
  }),
  {
    name   : 'shark-ui/extra-stylistic',
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/key-spacing': [
        'error',
        {
          align       : 'colon', // Makes object literals more tabular, helping identify inconsistencies and repetition
          ignoredNodes: [
            'ClassBody',
            'TSTypeLiteral',
            'TSInterfaceBody',
          ], // Avoids conflicts with "@stylistic/no-multi-spaces" and "@stylistic/type-annotation-spacing"
        },
      ],
      '@stylistic/nonblock-statement-body-position': [
        'error',
        'beside', // allows for single-line statements, useful for simple guards and "conditional sentences"
      ],
      '@stylistic/object-curly-newline': [
        'error',
        {
          multiline    : true,
          minProperties: 1,
        },
      ],
      '@stylistic/object-property-newline': [
        'error',
        {
          allowAllPropertiesOnSameLine: false,
        },
      ],
    },
  },

  pluginVue.configs['flat/strongly-recommended'],
  vueTsConfigs.strictTypeChecked,
  vueTsConfigs.stylisticTypeChecked,

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },

  {
    ...pluginCypress.configs.recommended as ConfigWithExtends,
    files: [
      'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
      'cypress/support/**/*.{js,ts,jsx,tsx}',
    ],
  },
);

export default tseslint.config([
  ...configWithVueTS,
  {
    name : 'shark-ui/safety-override',
    files: [
      '*/**/*.ts',
    ],
    rules: {
      '@typescript-eslint/no-unsafe-argument'     : 'error',
      '@typescript-eslint/no-unsafe-assignment'   : 'error',
      '@typescript-eslint/no-unsafe-call'         : 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-return'       : 'error',
    },
  },
]);
