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
  toAMDSharkUIOutput_plural,
} from './plural';

const toAMDSharkUIOutput_first = (
  {
    in: givenResponse,
    inferredFrom: givenInputText,
  }: {
    in: GenerateFromTextResponse;
    inferredFrom: TextToImage_Pipeline.Input['text'];
  },
): Effect.Effect<TextToImage_Pipeline.Output, Error> => Effect.gen(function* () {
  const inferredOutputs = yield* toAMDSharkUIOutput_plural({
    in          : givenResponse,
    inferredFrom: givenInputText,
  });

  if (
    !isNonEmptyArray(inferredOutputs)
  ) return yield* Effect.fail(new Error('Response had no text-to-image outputs.'));

  const [
    firstPipelineOutput,
  ] = inferredOutputs;

  return firstPipelineOutput;
});

export {
  toAMDSharkUIOutput_first,
};
