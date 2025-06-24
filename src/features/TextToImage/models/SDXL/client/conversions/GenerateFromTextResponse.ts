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

  const [soleInferredRawImage] = inferredRawImages;

  if (
    soleInferredRawImage === undefined
  ) return Attempt.abandon('Expected at least one raw image in response');

  if (
    soleInferredRawImage.base64 === undefined
  ) return Attempt.abandon('Expected image data from sole raw image');

  const base64DataOfNewImage = Base64CharacterEncodedByteSequence.forciblyParsedFrom(soleInferredRawImage.base64);

  const soleInferredOutputImage = {
    uri        : new ImageURI('png', 'base64', base64DataOfNewImage),
    description: allSerialized(givenInputText),
  };

  const soleInferredOutput = {
    image: soleInferredOutputImage,
  };

  return soleInferredOutput;
};

export {
  firstTextToImageOutput,
};
