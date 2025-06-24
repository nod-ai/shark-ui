import type * as StabilityAIClient from 'stabilityai-client-typescript/models/components';

import Base64CharacterEncodedByteSequence from '@/library/customTypes/Base64CharacterEncodedByteSequence.ts';
import ImageURI from '@/library/customTypes/UniformResourceIdentifier/Data/Image/index.ts';

import type {
  Output,
} from '@/features/TextToImage/types';

const toOutputImage = (
  givenImage: StabilityAIClient.Image,
  given: {
    description: string;
  },
): Output['image'] | null => {
  if (
    givenImage.base64 === undefined
  ) return null;

  const base64DataOfRawImage = Base64CharacterEncodedByteSequence.forciblyParsedFrom(givenImage.base64);

  const derivedImage = {
    uri        : new ImageURI('png', 'base64', base64DataOfRawImage),
    description: given.description,
  };

  return derivedImage;
};

export {
  toOutputImage,
};
