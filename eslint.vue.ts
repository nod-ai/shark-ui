import uncustomizedPluginVue from 'eslint-plugin-vue';

import type {
  InfiniteDepthConfigWithExtends,
} from 'typescript-eslint';

const pluginVue: InfiniteDepthConfigWithExtends[] = [
  uncustomizedPluginVue.configs['flat/recommended'],
];

export {
  pluginVue as default,
};
