import type {
  TextPrompt,
} from 'stabilityai-client-typescript/models/components';

import type {
  Output as TextToImage_Pipeline_Output,
} from '@/features/TextToImage/Pipeline'; // eslint-disable-line import/no-internal-modules -- more concise than relative import

const toSharkUIOutput_Image_Description_singular = (
  givenPrompt: TextPrompt,
): TextToImage_Pipeline_Output['image']['description'] => {
  const isDefault = (
    givenWeight: TextPrompt['weight'],
  ) => {
    return (givenWeight === undefined) || (givenWeight === 1);
  };

  if (
    isDefault(givenPrompt.weight)
  ) return givenPrompt.text;

  const promptWithSerializedWeights = `(${givenPrompt.text}: ${givenPrompt.weight.toString()})`;
  return promptWithSerializedWeights;
};

export {
  toSharkUIOutput_Image_Description_singular,
};
