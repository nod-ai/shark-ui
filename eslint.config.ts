import tseslint, {
  type ConfigWithExtends,
} from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from '@vue/eslint-config-typescript';

import pluginVue from 'eslint-plugin-vue';
import pluginVitest from '@vitest/eslint-plugin';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import pluginCypress from 'eslint-plugin-cypress/flat';

const configWithVueTS = defineConfigWithVueTs(
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
            'TSTypeLiteral',
            'TSInterfaceBody',
          ],
        },
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
