import {
  or,
} from 'effect/Predicate';

import {
  Node,
} from 'ts-morph';

const isTypeOnlyStatement = or(
  Node.isInterfaceDeclaration,
  Node.isTypeAliasDeclaration,
);

export {
  isTypeOnlyStatement,
};
