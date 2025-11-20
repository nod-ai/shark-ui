import {
  Effect,
  Option,
} from 'effect';

import type * as StabilityAIClient from 'stabilityai-client-typescript/models/components';

import Sequence from '@/library/Sequence';
import URI from '@/library/URI';

import {
  TextToImage_Pipeline,
} from '@/features/TextToImage/Pipeline'; // eslint-disable-line import/no-internal-modules -- more concise than relative import

function toAMDSharkUIOutput_Image(
  givenImage: StabilityAIClient.Image,
  given: {
    description: TextToImage_Pipeline.Output['image']['description'];
  },
): Effect.Effect<TextToImage_Pipeline.Output['image'], Error> {
  return Effect.gen(function* () {
    const rawBase64Data = yield* Option.fromNullable(givenImage.base64).pipe(
      Effect.orElseFail(() => new Error('Data for Stability AI image was not present.')),
    );

    const base64DataOfRawImage = yield* Sequence.Byte.Encoded.Base64.option(rawBase64Data).pipe(
      Effect.orElseFail(() => new Error('Data for Stability AI image was not base64-encoded.')),
    );

    const derivedImage = TextToImage_Pipeline.Output.Image({
      uri        : new URI.Image('png', 'base64', base64DataOfRawImage),
      description: given.description,
    });

    return derivedImage;
  });
}

export {
  toAMDSharkUIOutput_Image,
};
