import markdown from '@eslint/markdown';

import type {
  ConfigWithExtends,
} from 'typescript-eslint';

const pluginMarkdown: ConfigWithExtends[] = [
  ...markdown.configs.recommended,
  {
    language: 'markdown/gfm',
  },
];

export {
  pluginMarkdown as default,
};
