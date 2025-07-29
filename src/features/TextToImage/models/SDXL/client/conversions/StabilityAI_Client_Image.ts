import type * as StabilityAIClient from 'stabilityai-client-typescript/models/components';

import Base64CharacterEncodedByteSequence from '@/library/Base64CharacterEncodedByteSequence/definition';
import ImageURI from '@/library/UniformResourceIdentifier/Data/Image/definition';

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

  const base64DataOfRawImage = Base64CharacterEncodedByteSequence.parsedFrom(givenImage.base64).forciblyUnwrap(/* Broken web contracts require intervention */);

  const derivedImage = {
    uri        : new ImageURI('png', 'base64', base64DataOfRawImage),
    description: given.description,
  };

  return derivedImage;
};

export {
  toOutputImage,
};
