import type {
  GenerateFromTextResponse,
} from 'stabilityai-client-typescript/models/operations';

import Attempt from '@/library/Attempt';

import {
  hasAtLeastOne,
} from '@/library/utilitiesByType/array';

import type {
  Input as TextToImage_Pipeline_Input,
  Output as TextToImage_Pipeline_Output,
} from '@/features/TextToImage/Pipeline';

import {
  toSharkUIOutput_Image_Description_all,
} from './Image/Description/all';

import {
  toSharkUIOutput_Image,
} from './Image/definition';

const TextToImage_Pipeline_Output_Nullable_from = (
  givenImage: TextToImage_Pipeline_Output['image'] | null,
): TextToImage_Pipeline_Output | null => {
  if (
    givenImage === null
  ) return null;

  const derivedPipelineOutput = {
    image: givenImage,
  };

  return derivedPipelineOutput;
};

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

const toSharkUIOutput_first = (
  {
    in: givenResponse,
    inferredFrom: givenInputText,
  }: {
    in: GenerateFromTextResponse;
    inferredFrom: TextToImage_Pipeline_Input['text'];
  },
): TextToImage_Pipeline_Output => {
  const inferredOutputs = toSharkUIOutput_plural({
    in          : givenResponse,
    inferredFrom: givenInputText,
  });

  if (
    inferredOutputs === null
  ) return Attempt.abandon('Expected text-to-image output in response result');

  if (
    !hasAtLeastOne(inferredOutputs)
  ) return Attempt.abandon('Expected at least one text-to-image output in response');

  const [firstInferredOutput] = inferredOutputs;

  if (
    firstInferredOutput === null
  ) return Attempt.abandon('Expected at least one well-formed text-to-image output in response');

  return firstInferredOutput;
};

export {
  toSharkUIOutput_first,
};
