import type * as StabilityAIClient from 'stabilityai-client-typescript/models/components';

import Sequence from '@/library/Sequence';
import URI from '@/library/URI';

import type {
  TextToImage_Pipeline,
} from '@/features/TextToImage/Pipeline'; // eslint-disable-line import/no-internal-modules -- more concise than relative import

const toSharkUIOutput_Image = (
  givenImage: StabilityAIClient.Image,
  given: {
    description: TextToImage_Pipeline.Output['image']['description'];
  },
): TextToImage_Pipeline.Output['image'] | null => {
  if (
    givenImage.base64 === undefined
  ) return null;

  const base64DataOfRawImage = Sequence.Byte.Encoded.Base64.parsedFrom(givenImage.base64).forciblyUnwrap(/* Broken web contracts require intervention */);

  const derivedImage = {
    uri        : new URI.Image('png', 'base64', base64DataOfRawImage),
    description: given.description,
  };

  return derivedImage;
};

export {
  toSharkUIOutput_Image,
};
