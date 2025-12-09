import {
  Command,
} from '@effect/cli';

import {
  TestCompanionCLI_generateForUnit,
} from './generate-for-unit';

const TestCompanionCLI = Command.make(
  'test-companion',
).pipe(
  Command.withDescription('Manage the companion test files for testable units.'),
  Command.withSubcommands([
    TestCompanionCLI_generateForUnit,
  ]),
  Command.run({
    name   : 'Test Companion CLI',
    version: '0.0.0',
  }),
);

export {
  TestCompanionCLI,
};
