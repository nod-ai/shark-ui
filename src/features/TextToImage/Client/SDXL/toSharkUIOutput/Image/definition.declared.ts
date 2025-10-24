import {
  Effect,
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
  return Effect.gen(function* () {
    const rawBase64Data = Option.fromNullable(givenImage.base64).pipe(
      Effect.orDieWith(() => new Error('Data for Stability AI image was not present.')),
    ).pipe(Effect.runSync);

    const base64DataOfRawImage = Sequence.Byte.Encoded.Base64.option(rawBase64Data).pipe(
      Effect.orDieWith(() => new Error('Data for Stability AI image was not base64-encoded.')),
    ).pipe(Effect.runSync);

    const derivedImage = {
      uri        : new URI.Image('png', 'base64', base64DataOfRawImage),
      description: given.description,
    };

    return derivedImage;
  }).pipe(Effect.runSync);
}

export {
  toSharkUIOutput_Image,
};
