import type {
  Configuration,
} from 'lint-staged';

const lintStagedConfig = {
  '!(*.md)': 'npm run lint',
  '*.md'   : 'npm run lint:docs',
} satisfies Configuration;

export {
  lintStagedConfig as default,
};
