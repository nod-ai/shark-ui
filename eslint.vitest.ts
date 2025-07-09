import vitest from '@vitest/eslint-plugin';

import type {
  ConfigWithExtends,
} from 'typescript-eslint';

const pluginVitest: ConfigWithExtends[] = [
  {
    ...vitest.configs.all,
    settings: {
      vitest: {
        typecheck: true,
      },
    },
    files: [
      'src/**/*.test.*',
    ],
  },
];

export {
  pluginVitest as default,
};
