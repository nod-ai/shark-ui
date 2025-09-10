import type {
  GenerateFromTextResponse,
} from 'stabilityai-client-typescript/models/operations';

import Attempt from '@/library/Attempt';

import {
  hasAtLeastOne,
} from '@/library/utilitiesByType/array';

import type * as TextToImage_Pipeline from '@/features/TextToImage/Pipeline'; // eslint-disable-line import/no-internal-modules -- more concise than relative import

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
  const inferredOutputs = toSharkUIOutput_plural({
    in          : givenResponse,
    inferredFrom: givenInputText,
  });

  if (
    inferredOutputs === null
  ) return Attempt.abandon('Expected text-to-image output in response result');

  if (
    !hasAtLeastOne(inferredOutputs)
  ) return Attempt.abandon('Expected at least one text-to-image output in response');

  const [firstInferredOutput] = inferredOutputs;

  if (
    firstInferredOutput === null
  ) return Attempt.abandon('Expected at least one well-formed text-to-image output in response');

  return firstInferredOutput;
};

export {
  toSharkUIOutput_first,
};
