import {
  NodeContext,
} from '@effect/platform-node';

import {
  Effect,
} from 'effect';

import {
  isFunction,
  isObject,
} from 'effect/Predicate';

import type {
  CoverageMap,
} from 'istanbul-lib-coverage';

import {
  DefaultReporter,
} from 'vitest/reporters';

import TypeScript from '../@internal/TypeScript';

import {
  InternalProject,
} from '../TSMorph';

// 2025-11-17: `@types/istanbul-lib-coverage@v2.0.6` doesn't reflect the structure of `istanbul-lib-coverage@v3.2.2` with complete accuracy.
// - can't use `instanceOf CoverageMap` because `CoverageMap` is only exported at the type level.
// - can't use `createCoverageMap` because it expects a `CoverageMapData` object at the type level even though a plain object is sufficient at the runtime level.
const isCoverageMap = (
  givenSubject: unknown,
): givenSubject is CoverageMap => (
  isObject(givenSubject)
  && 'data' in givenSubject
  && 'filter' in givenSubject
  && isFunction(givenSubject.filter)
);

class BehavioralOnlyReporter
  extends DefaultReporter {
  public onCoverage(
    givenCoverageMap: unknown,
  ): void {
    if (
      !isCoverageMap(givenCoverageMap)
    ) return;

    const behavioralDetectionProject = new InternalProject();

    const toCallableOnly = (
      givenFilePath: string,
    ): boolean => Effect.gen(function* () {
      const parsedPath = yield* TypeScript.File.Path.parsedFrom(givenFilePath);

      const derivedTypescriptFile = new TypeScript.File({
        path: parsedPath,
      });

      return yield* derivedTypescriptFile.soleExportIsCallableUsing(behavioralDetectionProject);
    }).pipe(
      Effect.provide(NodeContext.layer),
      Effect.runSync,
    );

    givenCoverageMap.filter(toCallableOnly);
  }
}

export {
  BehavioralOnlyReporter,
};
