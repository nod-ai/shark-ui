import uncustomizedPluginCypress from 'eslint-plugin-cypress';

import type {
  ConfigWithExtends,
} from 'typescript-eslint';

const pluginCypress: ConfigWithExtends[] = [
  {
    ...uncustomizedPluginCypress.configs.recommended,
    files: [
      'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
      'cypress/support/**/*.{js,ts,jsx,tsx}',
    ],
  },
];

export {
  pluginCypress as default,
};
