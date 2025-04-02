import type {
  Configuration,
} from 'lint-staged';

export default {
  '*': 'npm run lint',
} satisfies Configuration;
