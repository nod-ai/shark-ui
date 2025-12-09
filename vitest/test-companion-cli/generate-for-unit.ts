import {
  Args,
  Command,
} from '@effect/cli';

import {
  Console,
  Effect,
} from 'effect';

import TypeScript from '../../@internal/TypeScript';

import {
  TestCompanion,
} from '../TestCompanion';

const TestCompanionCLI_generateForUnit = Command.make(
  'generate-for-unit',
  {
    unit: Args.file({
      exists: 'yes',
    }).pipe(
      Args.withDescription('Path to the testable unit for which to generate a test companion'),
      Args.mapEffect((somePath) => Effect.gen(function* () {
        const parsedPath = yield* TypeScript.File.Path.parsedFrom(somePath).pipe(
          Effect.orDie,
        );

        const derivedUnit = new TypeScript.File({
          path: parsedPath,
        });

        return derivedUnit;
      })),
    ),
  },
  (argumentsByName) => Effect.gen(function* () {
    const draftedTestCompanion = new TestCompanion({
      unit: argumentsByName.unit,
    });

    const generatedTestCompanion = yield* draftedTestCompanion.write();

    yield* Console.log(`Created test companion at "${generatedTestCompanion.getFilePath()}"`);
  }),
);

export {
  TestCompanionCLI_generateForUnit,
};
