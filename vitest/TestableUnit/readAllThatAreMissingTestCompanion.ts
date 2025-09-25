import {
  type FileSystem,
  Path,
} from '@effect/platform';

import {
  Effect,
} from 'effect';

import type TypeScript from '../../@internal/TypeScript';

import {
  Coverage,
} from '../Coverage';

import {
  TestableUnit_allThoseMissingCompanionAccordingTo,
} from './allThoseMissingCompanionAccordingTo';

const TestableUnit_readAllThatAreMissingTestCompanion: Effect.Effect<
  TypeScript.File[],
  Error,
  | Path.Path
  | FileSystem.FileSystem
> = Effect.gen(function* () {
  const ProvidedPath = yield* Path.Path;
  const relativePathFromCurrentModuleToProjectRoot = '../../';

  const absolutePathToProjectRoot = yield* ProvidedPath.fromFileUrl(new URL(
    relativePathFromCurrentModuleToProjectRoot,
    import.meta.url,
  ));

  const pathToProjectRoot = ProvidedPath.parse(absolutePathToProjectRoot);
  const latestCoverageSummary = yield* Coverage.Summary.rootedAt(pathToProjectRoot);
  return yield* TestableUnit_allThoseMissingCompanionAccordingTo(latestCoverageSummary);
});

export {
  TestableUnit_readAllThatAreMissingTestCompanion,
};
