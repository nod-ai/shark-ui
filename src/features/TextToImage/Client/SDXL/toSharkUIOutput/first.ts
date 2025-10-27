import {
  Effect,
} from 'effect';

import {
  isNonEmptyArray,
} from 'effect/Array';

import type {
  GenerateFromTextResponse,
} from 'stabilityai-client-typescript/models/operations';

import type {
  TextToImage_Pipeline,
} from '@/features/TextToImage/Pipeline'; // eslint-disable-line import/no-internal-modules -- more concise than relative import

import {
  toSharkUIOutput_plural,
} from './plural';

const toSharkUIOutput_first = (
  {
    in: givenResponse,
    inferredFrom: givenInputText,
  }: {
    in: GenerateFromTextResponse;
    inferredFrom: TextToImage_Pipeline.Input['text'];
  },
): Effect.Effect<TextToImage_Pipeline.Output> => Effect.gen(function* () {
  const inferredOutputs = yield* toSharkUIOutput_plural({
    in          : givenResponse,
    inferredFrom: givenInputText,
  });

  if (
    !isNonEmptyArray(inferredOutputs)
  ) return yield* Effect.dieMessage('Expected at least one text-to-image output in response');

  const [firstPipelineOutput] = inferredOutputs;
  return firstPipelineOutput;
});

export {
  toSharkUIOutput_first,
};
