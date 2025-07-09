import vitest from '@vitest/eslint-plugin';

import type {
  ConfigWithExtends,
} from 'typescript-eslint';

const pluginVitest: ConfigWithExtends[] = [
  {
    ...vitest.configs.recommended,
    files: [
      'src/**/*.test.*',
    ],
  },
];

export {
  pluginVitest as default,
};
