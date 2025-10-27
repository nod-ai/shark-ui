import {
  Option,
} from 'effect';

import type * as StabilityAIClient from 'stabilityai-client-typescript/models/components';

import Sequence from '@/library/Sequence';
import URI from '@/library/URI';

import type {
  TextToImage_Pipeline,
} from '@/features/TextToImage/Pipeline'; // eslint-disable-line import/no-internal-modules -- more concise than relative import

function toSharkUIOutput_Image(
  givenImage: StabilityAIClient.Image,
  given: {
    description: TextToImage_Pipeline.Output['image']['description'];
  },
): TextToImage_Pipeline.Output['image'] {
  const rawBase64Data = Option.fromNullable(givenImage.base64).pipe(
    Option.getOrThrowWith(() => new Error('Data for Stability AI image was not present.')),
  );

  const base64DataOfRawImage = Sequence.Byte.Encoded.Base64.option(rawBase64Data).pipe(
    Option.getOrThrowWith(() => new Error('Data for Stability AI image was not base64-encoded.')),
  );

  const derivedImage = {
    uri        : new URI.Image('png', 'base64', base64DataOfRawImage),
    description: given.description,
  };

  return derivedImage;
}

export {
  toSharkUIOutput_Image,
};
