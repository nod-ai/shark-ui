import {
  Node,
} from 'ts-morph';

const isCallableStatement = (
  givenNode: Node,
) => ( // eslint-disable-line @typescript-eslint/explicit-function-return-type -- Ensures predicate accurately reflects implementation
  Node.isClassDeclaration(givenNode)
  || Node.isEnumDeclaration(givenNode)
  || Node.isFunctionDeclaration(givenNode)
);

export {
  isCallableStatement,
};
