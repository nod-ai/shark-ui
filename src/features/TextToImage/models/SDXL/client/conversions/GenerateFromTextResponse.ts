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

  const generatedRawImages = givenResponse.result.artifacts;

  if (
    generatedRawImages === undefined
  ) return Attempt.abandon('Expected raw image in response result');

  const [soleGeneratedRawImage] = generatedRawImages;

  if (
    soleGeneratedRawImage === undefined
  ) return Attempt.abandon('Expected at least one raw image in response');

  if (
    soleGeneratedRawImage.base64 === undefined
  ) return Attempt.abandon('Expected image data from sole raw image');

  const base64DataOfNewImage = Base64CharacterEncodedByteSequence.forciblyParsedFrom(soleGeneratedRawImage.base64);

  const soleGeneratedOutputImage = {
    uri        : new ImageURI('png', 'base64', base64DataOfNewImage),
    description: allSerialized(givenInputText),
  };

  const soleGeneratedOutput = {
    image: soleGeneratedOutputImage,
  };

  return soleGeneratedOutput;
};

export {
  firstTextToImageOutput,
};
