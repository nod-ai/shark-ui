import type {
  FileSystem,
  Path,
} from '@effect/platform';

import {
  Effect,
  pipe,
} from 'effect';

import {
  some,
} from 'effect/Boolean';

import TypeScript from '../../@internal/TypeScript';

import type {
  Coverage,
} from '../Coverage';

import {
  TestCompanion,
} from '../TestCompanion';

const TestableUnit_allThoseMissingCompanionAccordingTo = (
  givenSummary: Coverage.Summary,
): Effect.Effect<
  TypeScript.File[],
  Error,
  | Path.Path
  | FileSystem.FileSystem
> => Effect.gen(function* () {
  const absolutePathsToUnitsThatHaveNoTestImplementation = Object.entries(givenSummary.byFilePath)
    .filter((eachEntry) => {
      const [
        ,
        eachMetric,
      ] = eachEntry;

      return some([
        (eachMetric.functions.pct === 0),
        (eachMetric.statements.pct === 0),
      ]);
    })
    .map(($0) => $0[0]);

  const pathsToUnitsThatHaveNoTestImplementation = yield* Effect.all(
    absolutePathsToUnitsThatHaveNoTestImplementation.map(TypeScript.File.Path.parsedFrom),
  );

  const unitsThatHaveNoTestImplementation = pathsToUnitsThatHaveNoTestImplementation.map(($0) => new TypeScript.File({
    path: $0,
  }));

  const unitsThatHaveNoTestCompanion = yield* pipe(
    unitsThatHaveNoTestImplementation,
    Effect.filter(($0) => TestCompanion.doesExistFor($0), {
      negate: true,
    }),
  );

  return unitsThatHaveNoTestCompanion;
});

export {
  TestableUnit_allThoseMissingCompanionAccordingTo,
};
