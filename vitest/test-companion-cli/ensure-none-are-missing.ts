import {
  Command,
} from '@effect/cli';

import {
  Path,
} from '@effect/platform';

import {
  Console,
  Effect,
} from 'effect';

import {
  isEmptyArray,
} from 'effect/Array';

import {
  TestableUnit,
} from '../TestableUnit';

const TestCompanionCLI_ensureNoneAreMissing = Command.make(
  'ensure-none-are-missing',
  {},
  () => Effect.gen(function* () {
    const pathsOfUnitsWithoutCompanion = yield* TestableUnit.readAllThatAreMissingTestCompanion;

    if (
      isEmptyArray(pathsOfUnitsWithoutCompanion)
    ) return yield* Console.log('No units are missing test companions.');

    const ProvidedPath = yield* Path.Path;
    const relativePathFromCurrentModuleToProjectRoot = '../../';

    const absolutePathToProjectRoot = yield* ProvidedPath.fromFileUrl(new URL(
      relativePathFromCurrentModuleToProjectRoot,
      import.meta.url,
    ));

    const relativePathsFromProjectRootToUnitsWithoutCompanion = pathsOfUnitsWithoutCompanion
      .map(($0) => ProvidedPath.format($0.path).replace(absolutePathToProjectRoot, ''));

    const missingTestCompanionsError = new Error([
      `The following ${pathsOfUnitsWithoutCompanion.length.toString()} unit(s) have no test companion:`,
      ...relativePathsFromProjectRootToUnitsWithoutCompanion,
    ].join('\n'));

    return yield* Effect.fail(missingTestCompanionsError);
  }),
);

export {
  TestCompanionCLI_ensureNoneAreMissing,
};
