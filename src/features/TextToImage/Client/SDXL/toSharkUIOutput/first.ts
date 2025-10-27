import {
  Effect,
  Option,
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
): TextToImage_Pipeline.Output => {
  const potentialInferredOutputs = toSharkUIOutput_plural({
    in          : givenResponse,
    inferredFrom: givenInputText,
  });

  const inferredOutputs = Option.all(potentialInferredOutputs).pipe(
    Option.getOrThrowWith(() => new Error('Expected at least one well-formed text-to-image output in response')),
  );

  if (
    !isNonEmptyArray(inferredOutputs)
  ) return Effect.dieMessage('Expected at least one text-to-image output in response').pipe(Effect.runSync);

  const [firstPipelineOutput] = inferredOutputs;
  return firstPipelineOutput;
};

export {
  toSharkUIOutput_first,
};
