import {
  RuleCreator,
} from '@typescript-eslint/utils/eslint-utils';

const createInternalRule = RuleCreator((name) => `eslint-internal/${name}`);

export {
  createInternalRule,
};
