import markdown from '@eslint/markdown';

import type {
  Linter,
} from 'eslint';

const pluginMarkdown: Linter.Config[] = [
  ...markdown.configs.recommended,
  {
    language: 'markdown/gfm',
  },
];

export {
  pluginMarkdown as default,
};
