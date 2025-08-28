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

const toSharkUIOutput_serialized = (
  givenPrompt: TextPrompt,
): TextToImage_Pipeline_Output['image']['description'] => {
  if (
    isDefault(givenPrompt.weight)
  ) return givenPrompt.text;

  const promptWithSerializedWeights = `(${givenPrompt.text}: ${givenPrompt.weight.toString()})`;
  return promptWithSerializedWeights;
};

const toSharkUIOutput_allSerialized = (
  givenPrompts: TextPrompt[],
): TextToImage_Pipeline_Output['image']['description'] => givenPrompts
  .map(toSharkUIOutput_serialized)
  .join(', ');

export {
  toSharkUIOutput_allSerialized,
};
