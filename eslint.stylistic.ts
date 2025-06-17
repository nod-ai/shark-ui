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
