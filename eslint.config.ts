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

export default defineConfigWithVueTs(
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

  stylistic.configs.customize({
    flat       : true,
    commaDangle: 'always-multiline',
    quotes     : 'single',
    semi       : true,
  }),
  {
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/key-spacing': [
        'error',
        {
          align       : 'colon',
          ignoredNodes: [
            'TSTypeLiteral',
            'TSInterfaceBody',
          ],
        },
      ], // Makes object literals more tabular, helping identify inconsistencies and repetition
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
    ...pluginCypress.configs.recommended,
    files: [
      'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
      'cypress/support/**/*.{js,ts,jsx,tsx}',
    ],
  },
);
