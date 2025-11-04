import type {
  ConfigWithExtends,
} from 'typescript-eslint';

import eslintInternal from './eslint-internal';

const pluginInternal: ConfigWithExtends[] = [
  {
    name   : 'shark-ui/internal',
    plugins: {
      internal: eslintInternal,
    },
    rules: {
      'internal/prefer-new-lines-around-condition-of-blockless-if-statements': [
        'error', // Reduces diff noise when modifying conditions of guard clauses
      ],
    },
  },
];

export {
  pluginInternal as default,
};
