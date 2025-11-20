import type {
  TextPrompt,
} from 'stabilityai-client-typescript/models/components';

import type {
  TextToImage_Pipeline,
} from '@/features/TextToImage/Pipeline'; // eslint-disable-line import/no-internal-modules -- more concise than relative import

const toAMDSharkUIOutput_Image_Description_singular = (
  givenPrompt: TextPrompt,
): TextToImage_Pipeline.Output['image']['description'] => {
  const isDefault = (
    givenWeight: TextPrompt['weight'],
  ): givenWeight is 1 | undefined => {
    return (givenWeight === undefined) || (givenWeight === 1);
  };

  if (
    isDefault(givenPrompt.weight)
  ) return givenPrompt.text;

  const promptWithSerializedWeights = `(${givenPrompt.text}: ${givenPrompt.weight.toString()})`;
  return promptWithSerializedWeights;
};

export {
  toAMDSharkUIOutput_Image_Description_singular,
};
