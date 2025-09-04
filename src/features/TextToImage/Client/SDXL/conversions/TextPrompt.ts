import type {
  TextPrompt,
} from 'stabilityai-client-typescript/models/components';

const isDefault = (
  givenWeight: TextPrompt['weight'],
) => {
  return (givenWeight === undefined) || (givenWeight === 1);
};

const serialized = (
  givenPrompt: TextPrompt,
): string => {
  if (
    isDefault(givenPrompt.weight)
  ) return givenPrompt.text;

  const promptWithSerializedWeights = `(${givenPrompt.text}: ${givenPrompt.weight.toString()})`;
  return promptWithSerializedWeights;
};

const allSerialized = (
  givenPrompts: TextPrompt[],
): string => givenPrompts
  .map(serialized)
  .join(', ');

export {
  allSerialized,
};
