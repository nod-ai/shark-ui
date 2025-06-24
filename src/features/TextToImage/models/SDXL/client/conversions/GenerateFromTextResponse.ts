import type {
  GenerateFromTextResponse,
} from 'stabilityai-client-typescript/models/operations';

import Attempt from '@/library/Attempt';
import Base64CharacterEncodedByteSequence from '@/library/customTypes/Base64CharacterEncodedByteSequence';
import ImageURI from '@/library/customTypes/UniformResourceIdentifier/Data/Image';

import {
  allSerialized,
} from '@/features/TextToImage/models/SDXL/client/conversions/TextPrompt';

import type {
  Input,
  Output,
} from '@/features/TextToImage/types';

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

  if (
    firstInferredRawImage.base64 === undefined
  ) return Attempt.abandon('Expected image data from first raw image');

  const base64DataOfNewImage = Base64CharacterEncodedByteSequence.forciblyParsedFrom(firstInferredRawImage.base64);

  const firstInferredOutputImage = {
    uri        : new ImageURI('png', 'base64', base64DataOfNewImage),
    description: allSerialized(givenInputText),
  };

  const firstInferredOutput = {
    image: firstInferredOutputImage,
  };

  return firstInferredOutput;
};

export {
  firstTextToImageOutput,
};
