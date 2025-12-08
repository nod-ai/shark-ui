import {
  configureVueProject,
  defineConfigWithVueTs,
  vueTsConfigs as VueTSConfig,
} from '@vue/eslint-config-typescript';

import {
  defineConfig,
} from 'eslint/config';

import type {
  ConfigWithExtends,
} from 'typescript-eslint';

import pluginCypress from './cypress/eslint.config';
import pluginImport from './eslint.import';
import pluginInternal from './eslint.internal';

import pluginJSONC, {
  jsonPatterns,
} from './eslint.jsonc';

import pluginMarkdown, {
  markdownPatterns,
} from './eslint.markdown';

import pluginStylistic from './eslint.stylistic';
import pluginVitest from './eslint.vitest';
import pluginVue from './eslint.vue';

const extraConfigForESLint: ConfigWithExtends = {
  name : 'amd-shark-ui/eslint',
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
        message : 'Prefer `Effect.try` or `Effect.tryPromise` with `Effect.catch` for error matching over `try`/`catch`.',
      },
      {
        selector: 'ThrowStatement',
        message : 'Prefer `Effect.gen` callback for error propagation over `throw`.',
      },
    ],
    'no-useless-rename': [
      'error', // Reduces diff noise when renaming symbols at module boundaries
    ],
  },
};

const extraConfigForTypeScriptESLint: ConfigWithExtends = {
  name : 'amd-shark-ui/@typescript-eslint',
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
    '@typescript-eslint/explicit-function-return-type': [
      'error', // encourages developers to state the desired interface up front
      {
        allowExpressions             : true, // for situations where the function consuming the expression as an argument defines the interface
        allowTypedFunctionExpressions: true, // for situations where the variable or property receiving the function defines the interface
      },
    ],
    '@typescript-eslint/explicit-member-accessibility': [
      'error', // Easier to see dead code in situations where a member is marked `private`
    ],
    '@typescript-eslint/no-confusing-void-expression': [
      'error',
      {
        ignoreArrowShorthand: true, // allows for immediately-ran `Effect.gen` callbacks that return `void`
      },
    ],
    '@typescript-eslint/no-import-type-side-effects': [
      'error', // Avoids unexpected behavior, trims down the size of the bundle
    ],
    '@typescript-eslint/no-unnecessary-parameter-property-assignment': [
      'error', // See https://www.typescriptlang.org/docs/handbook/2/classes.html#parameter-properties for more information
    ],
    '@typescript-eslint/strict-boolean-expressions': [
      'error', // Encourages more explicit boolean expressions as well as better handling of empty values and optionals
    ],
  },
};

const VueTSConfig_overridesForAugmentationsToModuleDefinitions: ConfigWithExtends = {
  name : 'amd-shark-ui/module-definition-augmentations',
  files: [
    '**/definition.declared.augmentation.ts',
  ],
  rules: {
    '@typescript-eslint/no-namespace': [
      'off', // Namespaces are the only way to emulate nested types. It's not possible to do this with pure modules.
    ],
  },
};

configureVueProject({
  allowComponentTypeUnsafety: false, // Takes advantage of strict type checking
});

const configWithVueTS = defineConfigWithVueTs(
  {
    name : 'app/files-to-lint',
    files: [
      '**/*.{ts,mts,tsx,vue}',
    ],
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
  ...pluginInternal,

  ...pluginVue,
  VueTSConfig.strictTypeChecked,
  VueTSConfig.stylisticTypeChecked,
  VueTSConfig_overridesForAugmentationsToModuleDefinitions,

  ...pluginVitest,
  ...pluginCypress,
);

const completeConfig = defineConfig([
  {
    // @ts-expect-error: according to bullet "2." under https://typescript-eslint.io/packages/typescript-eslint/#migrating-to-defineconfig
    extends: configWithVueTS,
    ignores: [
      ...markdownPatterns,
      ...jsonPatterns,
    ],
  },
  {
    extends: pluginMarkdown,
    files  : markdownPatterns,
  },
  {
    extends: pluginJSONC,
    files  : jsonPatterns,
  },
]);

export {
  completeConfig as default,
};
