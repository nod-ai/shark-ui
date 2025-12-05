import {
  preferNewLinesAroundConditionOfBlocklessIfStatements,
} from './preferNewLinesAroundConditionOfBlocklessIfStatements';

import {
  preferNewLinesBetweenNamedImports,
} from './preferNewLinesBetweenNamedImports';

import {
  requireExtensionForTSModules,
} from './requireExtensionForTSModules';

const pluginInternal_rules = {
  'prefer-new-lines-around-condition-of-blockless-if-statements': preferNewLinesAroundConditionOfBlocklessIfStatements,
  'prefer-new-lines-between-named-imports'                      : preferNewLinesBetweenNamedImports,
  'require-extension-for-ts-modules'                            : requireExtensionForTSModules,
};

export {
  pluginInternal_rules,
};
