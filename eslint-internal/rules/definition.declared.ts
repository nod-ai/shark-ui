import {
  preferNewLinesAroundConditionOfBlocklessIfStatements,
} from './preferNewLinesAroundConditionOfBlocklessIfStatements';

import {
  preferNewLinesBetweenNamedImports,
} from './preferNewLinesBetweenNamedImports';

const pluginInternal_rules = {
  'prefer-new-lines-around-condition-of-blockless-if-statements': preferNewLinesAroundConditionOfBlocklessIfStatements,
  'prefer-new-lines-between-named-imports'                      : preferNewLinesBetweenNamedImports,
};

export {
  pluginInternal_rules,
};
