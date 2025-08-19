import type * as StabilityAIClient from 'stabilityai-client-typescript/models/components';

import Sequence from '@/library/Sequence';
import URI_Image from '@/library/UniformResourceIdentifier/Image';

import type {
  Output as TextToImage_Pipeline_Output,
} from '@/features/TextToImage/Pipeline';

const toOutputImage = (
  givenImage: StabilityAIClient.Image,
  given: {
    description: string;
  },
): TextToImage_Pipeline_Output['image'] | null => {
  if (
    givenImage.base64 === undefined
  ) return null;

  const base64DataOfRawImage = Sequence.Byte.Encoded.Base64.parsedFrom(givenImage.base64).forciblyUnwrap(/* Broken web contracts require intervention */);

  const derivedImage = {
    uri        : new URI_Image('png', 'base64', base64DataOfRawImage),
    description: given.description,
  };

  return derivedImage;
};

export {
  toOutputImage,
};
