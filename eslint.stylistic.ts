import stylistic from '@stylistic/eslint-plugin';

import type {
  ConfigWithExtends,
} from 'typescript-eslint';

const extraConfig: ConfigWithExtends = {
  name   : 'shark-ui/extra-stylistic',
  plugins: {
    '@stylistic': stylistic,
  },
  rules: {
    '@stylistic/arrow-parens': [
      'error',
      'always', // Helps minimize diffs and mitigate merge conflicts.
    ],
    '@stylistic/function-call-argument-newline': [
      'error',
      'consistent', // Helps minimize diffs and mitigate merge conflicts.
    ],
    '@stylistic/function-paren-newline': [
      'error',
      'multiline-arguments', // Helps minimize diffs and mitigate merge conflicts. Avoids asymmetry and grouping in function signatures.
    ],
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
    '@stylistic/no-extra-semi': [
      'error', // Reduces noise in diffs
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
    '@stylistic/operator-linebreak': [
      'error',
      'before',
      {
        overrides: {
          '=': 'after', // Prevents misalignment of `|` and `&` in union and intersection types
        },
      },
    ],
    '@stylistic/padded-blocks': [
      'error',
      'never', // Reduces noise in diffs
    ],
    '@stylistic/padding-line-between-statements': [
      'error',
      {
        blankLine: 'always', // Each of these statements should be padded to look like an "island" since they will never express an order-sensitive procedure
        prev     : 'export',
        next     : 'export',
      },
      {
        blankLine: 'always', // reduces noise in diffs
        prev     : '*',
        next     : [
          'block-like',
          'class',
          'function-overload',
          'if', // for guard clauses
          'multiline-let', // i.e. for chained calls and object literals
          'multiline-const', // i.e. for chained calls and object literals
          'multiline-expression', // i.e. for multiline function calls
        ],
      },
      {
        blankLine: 'always', // reduces noise in diffs
        prev     : [
          'block-like',
          'class',
          'function-overload',
          'if', // for guard clauses
          'multiline-let', // i.e. for chained calls and object literals
          'multiline-const', // i.e. for chained calls and object literals
          'multiline-expression', // i.e. for multiline function calls
        ],
        next: '*',
      },
    ],
  },
};

const pluginStylistic: ConfigWithExtends[] = [
  stylistic.configs.customize({
    commaDangle: 'always-multiline',
    quotes     : 'single',
    semi       : true,
  }),
  extraConfig,
];

export {
  pluginStylistic as default,
};
