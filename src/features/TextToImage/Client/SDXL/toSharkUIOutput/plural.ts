import {
  Option,
} from 'effect';

import type {
  GenerateFromTextResponse,
} from 'stabilityai-client-typescript/models/operations';

import Attempt from '@/library/Attempt';

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
): Option.Option<Option.Option<TextToImage_Pipeline.Output>[]> => {
  if (
    !('artifacts' in givenResponse.result)
  ) return Attempt.abandon('Expected response body rather than readable stream');

  const inferredRawImages = Option.fromNullable(givenResponse.result.artifacts);

  const inferredOutputs = Option.map(
    inferredRawImages,
    $0 => $0
      .map($0 => toSharkUIOutput_Image($0, {
        description: toSharkUIOutput_Image.Description.all(givenInputText),
      }))
      .map($0 => TextToImage_Pipeline.Output.Option.from($0)),
  );

  return inferredOutputs;
};

export {
  toSharkUIOutput_plural,
};
