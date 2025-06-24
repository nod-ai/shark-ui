import type {
  GenerateFromTextResponse,
} from 'stabilityai-client-typescript/models/operations';

import Attempt from '@/library/Attempt';

import {
  hasAtLeastOne,
} from '@/library/utilitiesByType/array';

import {
  toOutputImage,
} from './StabilityAI_Client_Image';

import {
  allSerialized,
} from '@/features/TextToImage/models/SDXL/client/conversions/TextPrompt';

import type {
  Input,
  Output,
} from '@/features/TextToImage/types';

const toNullableOutput = (
  givenImage: Output['image'] | null,
): Output | null => {
  if (
    givenImage === null
  ) return null;

  return {
    image: givenImage,
  };
};

const firstTextToImageOutput = (
  {
    in: givenResponse,
    inferredFrom: givenInputText,
  }: {
    in: GenerateFromTextResponse;
    inferredFrom: Input['text'];
  },
): Output => {
  const inferredOutputs = ((): (Output | null)[] | null => {
    if (
      !('artifacts' in givenResponse.result)
    ) return Attempt.abandon('Expected response body rather than readable stream');

    const inferredRawImages = givenResponse.result.artifacts;

    const inferredOutputs = inferredRawImages
      ?.map($0 => toOutputImage($0, {
        description: allSerialized(givenInputText),
      }))
      .map(toNullableOutput)
      ?? null;

    return inferredOutputs;
  })();

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
  firstTextToImageOutput,
};
