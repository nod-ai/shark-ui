import type {
  Configuration,
} from 'lint-staged';

const lintStagedConfig = {
  '!(*.md|*.json)': 'npm run lint',
  '*.md'          : 'npm run lint:docs',
  '*.json'        : 'npm run lint:json',
} satisfies Configuration;

export {
  lintStagedConfig as default,
};
