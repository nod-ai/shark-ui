import type {
  ConfigWithExtends,
} from 'typescript-eslint';

import eslintInternal from './eslint-internal';

const pluginInternal: ConfigWithExtends[] = [
  {
    name   : 'amd-shark-ui/internal',
    plugins: {
      internal: eslintInternal,
    },
    rules: {
      'internal/prefer-new-lines-around-condition-of-blockless-if-statements': [
        'error', // Reduces diff noise when modifying conditions of guard clauses
      ],
      'internal/prefer-new-lines-between-named-imports': [
        'error', // Reduces diff noise and chance of merge conflicts when modifying import statements
      ],
      'internal/require-extension-for-ts-modules': [
        'error',
        {
          allow: [
            'definition.declared.ts', // Always has just one declaration, so should never be directory-based
            'definition.declared.augmentation.ts', // Always a pure side effect, so should never be directory-based
            'definition.declared.withAugmentation.ts', // Always a barrel file, so should never be directory-based
            'definition.assembled.members.ts', // Always a barrel file, so should never be directory-based
            'definition.assembled.ts', // Always a barrel file, so should never be directory-based
            'exports.object.primary.ts', // Always a barrel file, so should never be directory-based
            'exports.object.auxiliaries.ts', // Always a barrel file, so should never be directory-based
            'exports.toolbox.ts', // Always a barrel file, so should never be directory-based
            'external.ts', // Always a barrel file, so should never be directory-based
          ],
        },
      ],
    },
  },
];

export {
  pluginInternal as default,
};
