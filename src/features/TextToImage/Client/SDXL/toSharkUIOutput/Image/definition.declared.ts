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
): Option.Option<TextToImage_Pipeline.Output['image']> {
  return Option.gen(function* () {
    const rawBase64Data = givenImage.base64;

    if (
      rawBase64Data === undefined
    ) return yield* Option.none();

    const base64DataOfRawImage = Sequence.Byte.Encoded.Base64(rawBase64Data);

    const derivedImage = {
      uri        : new URI.Image('png', 'base64', base64DataOfRawImage),
      description: given.description,
    };

    return derivedImage;
  });
}

export {
  toSharkUIOutput_Image,
};
