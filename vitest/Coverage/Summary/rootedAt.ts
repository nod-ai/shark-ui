import {
  FileSystem,
  Path,
} from '@effect/platform';

import {
  Effect,
  Schema,
} from 'effect';

import {
  Coverage_Summary_FromMixed,
} from './FromMixed';

import {
  Coverage_Summary_Path,
} from './Path';

import type {
  Coverage_Summary,
} from './definition.declared.ts';

const Coverage_Summary_rootedAt = (
  givenPathToProjectRoot: Path.Path.Parsed,
): Effect.Effect<
  Coverage_Summary,
  Error,
  | Path.Path
  | FileSystem.FileSystem
> => Effect.gen(function* () {
  const ProvidedPath = yield* Path.Path;
  const absolutePathToProjectRoot = ProvidedPath.format(givenPathToProjectRoot);
  const absolutePathToCoverageSummary = ProvidedPath.resolve(absolutePathToProjectRoot, Coverage_Summary_Path.defaultRelativeToProjectRoot);

  const ProvidedFileSystem = yield* FileSystem.FileSystem;

  const contentsOfCoverageSummaryInJSON = yield* ProvidedFileSystem.readFileString(absolutePathToCoverageSummary, 'utf8').pipe(
    Effect.mapError(($0) => new Error('Coverage summary could not be read.', {
      cause: $0,
    })),
  );

  const decodeCoverageSummaryFrom = Schema.decodeUnknown(Schema.parseJson(Coverage_Summary_FromMixed));
  const decodedCoverageSummary = yield* decodeCoverageSummaryFrom(contentsOfCoverageSummaryInJSON);
  return decodedCoverageSummary;
});

export {
  Coverage_Summary_rootedAt,
};
