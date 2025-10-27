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
  ) return yield* Effect.fail(new Error('Response had readable stream rather than body.')).pipe(Effect.orDie);

  const inferredRawImages = yield* Option.fromNullable(givenResponse.result.artifacts).pipe(
    Effect.orElseFail(() => new Error('Response body had no text-to-image results.')),
  ).pipe(Effect.orDie);

  const potentialOutputImages = inferredRawImages.map(($0) => toSharkUIOutput_Image($0, {
    description: toSharkUIOutput_Image.Description.all(givenInputText),
  }));

  const inferredOutputImages = yield* Effect.all(potentialOutputImages).pipe(
    Effect.orElseFail(() => new Error('Response had one or more malformed text-to-image outputs.')),
  ).pipe(Effect.orDie);

  const inferredOutputs = inferredOutputImages.map(($0) => new TextToImage_Pipeline.Output({
    image: $0,
  }));

  return inferredOutputs;
});

export {
  toSharkUIOutput_plural,
};
