import {
  Command,
} from '@effect/cli';

const TestCompanionCLI = Command.make(
  'test-companion',
).pipe(
  Command.withDescription('Manage the companion test files for testable units.'),
  Command.run({
    name   : 'Test Companion CLI',
    version: '0.0.0',
  }),
);

export {
  TestCompanionCLI,
};
