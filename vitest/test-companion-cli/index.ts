import {
  NodeContext,
  NodeRuntime,
} from '@effect/platform-node';

import {
  Effect,
} from 'effect';

import {
  TestCompanionCLI,
} from './definition.declared.ts';

TestCompanionCLI(process.argv).pipe(
  Effect.provide(NodeContext.layer),
  NodeRuntime.runMain,
);
