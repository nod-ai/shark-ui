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
): TextToImage_Pipeline.Output[] => {
  if (
    !('artifacts' in givenResponse.result)
  ) return Effect.dieMessage('Expected response body rather than readable stream').pipe(Effect.runSync);

  const inferredRawImages = Option.fromNullable(givenResponse.result.artifacts).pipe(
    Option.getOrThrowWith(() => new Error('Expected text-to-image output in response result')),
  );

  const inferredOutputs = inferredRawImages
    .map(($0) => toSharkUIOutput_Image($0, {
      description: toSharkUIOutput_Image.Description.all(givenInputText),
    }))
    .map(($0) => TextToImage_Pipeline.Output.Option.from($0));

  return Option.all(
    inferredOutputs
      .map(
        Option.getOrThrowWith(() => new Error('Failed to convert one or more raw images to Shark UI output')),
      )
      .map(Option.some),
  ).pipe(
    Option.getOrThrowWith(() => new Error('Expected at least one well-formed text-to-image output in response')),
  );
};

export {
  toSharkUIOutput_plural,
};
