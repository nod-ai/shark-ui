import {
  Option,
} from 'effect';

import type {
  GenerateFromTextResponse,
} from 'stabilityai-client-typescript/models/operations';

import Attempt from '@/library/Attempt';

import {
  hasAtLeastOne,
} from '@/library/utilitiesByType/array';

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

  const inferredOutputs = Option.getOrThrowWith(
    potentialInferredOutputs,
    () => new Error('Expected text-to-image output in response result'),
  );

  if (
    !hasAtLeastOne(inferredOutputs)
  ) return Attempt.Exit.die('Expected at least one text-to-image output in response');

  const [firstPotentialOutput] = inferredOutputs;

  const firstPipelineOutput = Option.getOrThrowWith(
    firstPotentialOutput,
    () => new Error('Expected at least one well-formed text-to-image output in response'),
  );

  return firstPipelineOutput;
};

export {
  toSharkUIOutput_first,
};
