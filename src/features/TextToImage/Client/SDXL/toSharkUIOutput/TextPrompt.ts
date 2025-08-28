import type {
  TextPrompt,
} from 'stabilityai-client-typescript/models/components';

import type {
  Output as TextToImage_Pipeline_Output,
} from '@/features/TextToImage/Pipeline';

const isDefault = (
  givenWeight: TextPrompt['weight'],
) => {
  return (givenWeight === undefined) || (givenWeight === 1);
};

const toSharkUIOutput_Image_Description_singular = (
  givenPrompt: TextPrompt,
): TextToImage_Pipeline_Output['image']['description'] => {
  if (
    isDefault(givenPrompt.weight)
  ) return givenPrompt.text;

  const promptWithSerializedWeights = `(${givenPrompt.text}: ${givenPrompt.weight.toString()})`;
  return promptWithSerializedWeights;
};

const toSharkUIOutput_Image_Description_all = (
  givenPrompts: TextPrompt[],
): TextToImage_Pipeline_Output['image']['description'] => givenPrompts
  .map(toSharkUIOutput_Image_Description_singular)
  .join(', ');

export {
  toSharkUIOutput_Image_Description_all,
};
