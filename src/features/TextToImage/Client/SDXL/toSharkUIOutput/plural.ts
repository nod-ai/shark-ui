import type {
  GenerateFromTextResponse,
} from 'stabilityai-client-typescript/models/operations';

import Attempt from '@/library/Attempt';

import {
  type Input as TextToImage_Pipeline_Input,
  type Output as TextToImage_Pipeline_Output,
  Output_Nullable_from as TextToImage_Pipeline_Output_Nullable_from,
} from '@/features/TextToImage/Pipeline'; // eslint-disable-line import/no-internal-modules -- more concise than relative import

import {
  toSharkUIOutput_Image,
  toSharkUIOutput_Image_Description_all,
} from './Image';

const toSharkUIOutput_plural = (
  {
    in: givenResponse,
    inferredFrom: givenInputText,
  }: {
    in: GenerateFromTextResponse;
    inferredFrom: TextToImage_Pipeline_Input['text'];
  },
): (TextToImage_Pipeline_Output | null)[] | null => {
  if (
    !('artifacts' in givenResponse.result)
  ) return Attempt.abandon('Expected response body rather than readable stream');

  const inferredRawImages = givenResponse.result.artifacts;

  if (
    inferredRawImages === undefined
  ) return null;

  const inferredOutputs = inferredRawImages
    .map($0 => toSharkUIOutput_Image($0, {
      description: toSharkUIOutput_Image_Description_all(givenInputText),
    }))
    .map($0 => TextToImage_Pipeline_Output_Nullable_from($0));

  return inferredOutputs;
};

export {
  toSharkUIOutput_plural,
};
