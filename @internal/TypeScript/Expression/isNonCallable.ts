import {
  some,
} from 'effect/Predicate';

import {
  Node,
} from 'ts-morph';

const isNonCallable = some([
  Node.isStringLiteral,
  Node.isNumericLiteral,
  Node.isAsExpression,
  Node.isNewExpression,
  Node.isObjectLiteralExpression,
  Node.isIdentifier,
]);

export {
  isNonCallable,
};
