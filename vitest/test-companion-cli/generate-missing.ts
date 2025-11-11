import {
  Command,
  Options,
} from '@effect/cli';

import {
  Console,
  Effect,
  Option,
} from 'effect';

import {
  isEmptyArray,
} from 'effect/Array';

import {
  InternalProject,
} from '../../TSMorph';

import {
  TestCompanion,
} from '../TestCompanion';

import {
  TestableUnit,
} from '../TestableUnit';

const TestCompanionCLI_generateMissing = Command.make(
  'generate-missing',
  {
    count: Options.integer('count').pipe(
      Options.withDescription('Number of units for which to generate test companions'),
      Options.optional,
      Options.mapEffect((potentialCount) => Effect.gen(function* () {
        if (
          Option.isNone(potentialCount)
        ) return potentialCount;

        const minCount = 1;

        if (
          potentialCount.value < minCount
        ) return yield* Effect.dieMessage(`Count must be at least ${minCount.toString()} when provided.`);

        return potentialCount;
      })),
    ),
  },
  (argumentsByName) => Effect.gen(function* () {
    const unitsWithoutCompanion = yield* TestableUnit.readAllThatAreMissingTestCompanion;

    if (
      isEmptyArray(unitsWithoutCompanion)
    ) return yield* Console.log('No units are missing test companions.');

    const numberOfUnitsToTake = argumentsByName.count.pipe(
      Option.getOrElse(() => unitsWithoutCompanion.length),
    );

    const takenUnitsWithoutCompanion = unitsWithoutCompanion.slice(0, numberOfUnitsToTake);

    yield* Console.log(`Drafting test companions for ${takenUnitsWithoutCompanion.length.toString()} units...`);

    const indentation = '  ';

    const batchGenerationProject = new InternalProject();

    yield* Effect.forEach(takenUnitsWithoutCompanion, (eachUnit) => Effect.gen(function* () {
      const emptyTestCompanion = new TestCompanion({
        unit: eachUnit,
      });

      const /*            */ draftedTestCompanion = yield* emptyTestCompanion.addTo(batchGenerationProject);
      const inspectablePathToDraftedTestCompanion = indentation.concat(draftedTestCompanion.getFilePath());
      yield* Console.log(inspectablePathToDraftedTestCompanion);
    }));

    yield* Console.log('Saving test companions...');
    yield* Effect.try(() => batchGenerationProject.saveSync());
    yield* Console.log('Test companions saved.');
  }),
);

export {
  TestCompanionCLI_generateMissing,
};
