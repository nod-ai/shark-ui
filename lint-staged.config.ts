import type {
  Configuration,
} from 'lint-staged';

const lintStagedConfig = {
  '*': 'npm run lint',
} satisfies Configuration;

export {
  lintStagedConfig as default,
};
