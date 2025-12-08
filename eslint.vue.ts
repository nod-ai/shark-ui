import uncustomizedPluginVue from 'eslint-plugin-vue';

import type {
  InfiniteDepthConfigWithExtends,
} from 'typescript-eslint';

const pluginVue: InfiniteDepthConfigWithExtends[] = [
  uncustomizedPluginVue.configs['flat/recommended'],
  {
    rules: {
      'vue/v-bind-style': [
        'error',
        'shorthand',
        {
          sameNameShorthand: 'always', // Makes it easier to see when a prop is just being passed through to a child component
        },
      ],
    },
  },
];

export {
  pluginVue as default,
};
