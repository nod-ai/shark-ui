import {
  Effect,
} from 'effect';

import {
  isEmptyArray,
} from 'effect/Array';

import {
  isUndefined,
} from 'effect/Predicate';

import {
  type ExportSpecifier,
  Node,
} from 'ts-morph';

import {
  soleElementIn,
} from '../../utilitiesByType/array';

import {
  isNonCallable,
} from '../Expression';

import {
  hasCallSignatures,
} from '../Type';

import {
  isCallableStatement,
} from './isCallableStatement';

import {
  isTypeOnlyStatement,
} from './isTypeOnlyStatement';

const hasCallableTarget = (
  givenExportSpecifier: ExportSpecifier,
): Effect.Effect<boolean> => Effect.gen(function* () {
  const targetDeclarations = givenExportSpecifier.getLocalTargetDeclarations();

  if (
    isEmptyArray(targetDeclarations)
  ) return yield* Effect.dieMessage('Expected at least one target declaration.');

  if (
    targetDeclarations.some(isCallableStatement)
  ) return true;

  if (
    targetDeclarations.every(isTypeOnlyStatement)
  ) return false;

  const targetVariableDeclarations = targetDeclarations.filter(Node.isVariableDeclaration);

  const targetVariableInitializers = targetVariableDeclarations
    .map(($0) => $0.getInitializer())
    .filter(($0) => !isUndefined($0));

  const soleTargetVariableInitializer = yield* soleElementIn(targetVariableInitializers).pipe(
    Effect.orDie,
  );

  if (
    Node.isArrowFunction(soleTargetVariableInitializer)
  ) return true;
  else if (
    Node.isCallExpression(soleTargetVariableInitializer)
  ) return hasCallSignatures(soleTargetVariableInitializer.getType());
  else if (
    isNonCallable(soleTargetVariableInitializer)
  ) return false;

  return yield* Effect.dieMessage('Encountered an unknown initializer type.');
});

export {
  hasCallableTarget,
};
