import {
  Effect,
  Option,
} from 'effect';

import type {
  GenerateFromTextResponse,
} from 'stabilityai-client-typescript/models/operations';

import {
  TextToImage_Pipeline,
} from '@/features/TextToImage/Pipeline'; // eslint-disable-line import/no-internal-modules -- more concise than relative import

import {
  toSharkUIOutput_Image,
} from './Image';

const toSharkUIOutput_plural = (
  {
    in: givenResponse,
    inferredFrom: givenInputText,
  }: {
    in: GenerateFromTextResponse;
    inferredFrom: TextToImage_Pipeline.Input['text'];
  },
): Effect.Effect<TextToImage_Pipeline.Output[]> => Effect.gen(function* () {
  if (
    !('artifacts' in givenResponse.result)
  ) return yield* Effect.fail(new Error('Expected response body rather than readable stream')).pipe(Effect.orDie);

  const inferredRawImages = yield* Option.fromNullable(givenResponse.result.artifacts).pipe(
    Effect.orDieWith(() => new Error('Expected text-to-image output in response result')),
  );

  const potentialOutputImages = inferredRawImages.map(($0) => toSharkUIOutput_Image($0, {
    description: toSharkUIOutput_Image.Description.all(givenInputText),
  }));

  const inferredOutputImages = yield* Effect.all(potentialOutputImages).pipe(
    Effect.orDieWith(() => new Error('Failed to convert one or more raw images to Shark UI output image.')),
  );

  const inferredOutputs = inferredOutputImages.map(($0) => new TextToImage_Pipeline.Output({
    image: $0,
  }));

  return inferredOutputs;
});

export {
  toSharkUIOutput_plural,
};
