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
): Option.Option<Option.Option<TextToImage_Pipeline.Output>[]> => Option.gen(function* () {
  if (
    !('artifacts' in givenResponse.result)
  ) return Effect.dieMessage('Expected response body rather than readable stream').pipe(Effect.runSync);

  const inferredRawImages = yield* Option.fromNullable(givenResponse.result.artifacts);

  const potentialOutputImages = inferredRawImages.map((eachRawImage) => {
    const convertedDescription = toSharkUIOutput_Image.Description.all(givenInputText);

    return toSharkUIOutput_Image(eachRawImage, {
      description: convertedDescription,
    });
  });

  const inferredOutputs = potentialOutputImages.map(($0) => TextToImage_Pipeline.Output.Option.from($0));
  return inferredOutputs;
});

export {
  toSharkUIOutput_plural,
};
