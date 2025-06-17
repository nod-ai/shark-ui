import pluginVitest from '@vitest/eslint-plugin';
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from '@vue/eslint-config-typescript';
// @ts-expect-error https://github.com/cypress-io/eslint-plugin-cypress/issues/232
import pluginCypress from 'eslint-plugin-cypress';
import pluginVue from 'eslint-plugin-vue';
import tseslint, {
  type ConfigWithExtends,
} from 'typescript-eslint';

import pluginImport from './eslint.import';
import pluginStylistic from './eslint.stylistic';

const extraConfigForESLint: ConfigWithExtends = {
  name : 'shark-ui/eslint',
  rules: {
    'eqeqeq': [
      'error', // Avoids `==` and `!=`, which perform type coercions that follow the rather obscure Abstract Equality Comparison Algorithm: https://www.ecma-international.org/ecma-262/5.1/#sec-11.9.3
    ],
    'no-implicit-coercion': [
      'error', // Using constructors, factories, and parsers for coercion rather than operators leads to less confusing behavior
    ],
    'no-restricted-exports': ['error', {
      restrictDefaultExports: {
        direct: true, // Keeping the export of something separate from its declaration leads to cleaner diffs. Prefer using `export { Foo as default }`
      },
    }],
    'no-restricted-syntax': [
      'error',
      {
        selector: 'TryStatement',
        message : 'Prefer `Attempt.to` for error matching over `try`/`catch`.',
      },
      {
        selector: 'ThrowStatement',
        message : 'Prefer `Attempt.that` callback for error propagation over `throw`.',
      },
    ],
  },
};

const extraConfigForTypeScriptESLint: ConfigWithExtends = {
  name : 'shark-ui/@typescript-eslint',
  rules: {
    '@typescript-eslint/consistent-type-exports': [
      'error',
    ],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer  : 'type-imports', // makes it easier to see which imports might have side effects
        fixStyle: 'inline-type-imports', // allows for more compact imports and tees up problematic imports to '@typescript-eslint/no-import-type-side-effects'
      },
    ],
    '@typescript-eslint/explicit-member-accessibility': [
      'error', // Easier to see dead code in situations where a member is marked `private`
    ],
    '@typescript-eslint/no-import-type-side-effects': [
      'error', // Avoids unexpected behavior, trims down the size of the bundle
    ],
  },
};

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

  extraConfigForESLint,
  extraConfigForTypeScriptESLint,
  ...pluginStylistic,
  ...pluginImport,

  pluginVue.configs['flat/recommended'],
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

const completeConfig = tseslint.config([
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

export {
  completeConfig as default,
};
