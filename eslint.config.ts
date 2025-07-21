import {
  configureVueProject,
  defineConfigWithVueTs,
  vueTsConfigs,
} from '@vue/eslint-config-typescript';

import pluginVue from 'eslint-plugin-vue';

import type {
  ConfigWithExtends,
} from 'typescript-eslint';

import pluginCypress from './cypress/eslint.config';
import pluginImport from './eslint.import';
import pluginStylistic from './eslint.stylistic';
import pluginVitest from './eslint.vitest';

const extraConfigForESLint: ConfigWithExtends = {
  name : 'shark-ui/eslint',
  rules: {
    'curly': [
      'error',
      'multi', // Encourages consistent formatting for guard statements, which are often used to prevent unnecessary nesting
    ],
    'eqeqeq': [
      'error', // Avoids `==` and `!=`, which perform type coercions that follow the rather obscure Abstract Equality Comparison Algorithm: https://www.ecma-international.org/ecma-262/5.1/#sec-11.9.3
    ],
    'no-else-return': [
      'error', // Helps highlight the primary path of a scope, avoids unnecessary nesting
    ],
    'no-implicit-coercion': [
      'error', // Using constructors, factories, and parsers for coercion rather than operators leads to less confusing behavior
    ],
    'no-restricted-exports': [
      'error',
      {
        restrictDefaultExports: {
          direct: true, // Keeping the export of something separate from its declaration leads to cleaner diffs. Prefer using `export { Foo as default }`
        },
      },
    ],
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
    '@typescript-eslint/no-unnecessary-parameter-property-assignment': [
      'error', // See https://www.typescriptlang.org/docs/handbook/2/classes.html#parameter-properties for more information
    ],
  },
};

configureVueProject({
  allowComponentTypeUnsafety: false, // Takes advantage of strict type checking
});

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

  ...pluginVitest,
  ...pluginCypress,
);

export {
  configWithVueTS as default,
};
