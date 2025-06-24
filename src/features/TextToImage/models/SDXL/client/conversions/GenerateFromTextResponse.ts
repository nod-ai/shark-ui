import type {
  GenerateFromTextResponse,
} from 'stabilityai-client-typescript/models/operations';

import Attempt from '@/library/Attempt';

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
  if (
    !('artifacts' in givenResponse.result)
  ) return Attempt.abandon('Expected response body rather than readable stream');

  const inferredRawImages = givenResponse.result.artifacts;

  if (
    inferredRawImages === undefined
  ) return Attempt.abandon('Expected raw image in response result');

  const [firstInferredRawImage] = inferredRawImages;

  if (
    firstInferredRawImage === undefined
  ) return Attempt.abandon('Expected at least one raw image in response');

  const firstInferredOutputImage = toOutputImage(firstInferredRawImage, {
    description: allSerialized(givenInputText),
  });

  const firstInferredOutput = toNullableOutput(firstInferredOutputImage);

  if (
    firstInferredOutput === null
  ) return Attempt.abandon('Expected at least one well-formed text-to-image output in response');

  return firstInferredOutput;
};

export {
  firstTextToImageOutput,
};
