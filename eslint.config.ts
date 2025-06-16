import stylistic from '@stylistic/eslint-plugin';
import pluginVitest from '@vitest/eslint-plugin';
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from '@vue/eslint-config-typescript';
// @ts-expect-error https://github.com/cypress-io/eslint-plugin-cypress/issues/232
import pluginCypress from 'eslint-plugin-cypress';
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
  },

  // TODO: Remove the @ts-expect-error comment once @typescript-eslint adds support of ES17/ES2026 (after v8.34.0)
  // @ts-expect-error -- ESLint v9.29.0 broke `FlatConfig.LanguageOptions` compatibility with @typescript-eslint v8.34.0
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
      '@stylistic/no-extra-semi'                   : 'error', // Reduces noise in diffs
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
