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

  return `(${givenPrompt.text}: ${givenPrompt.weight.toString()})`;
};

const allSerialized = (
  givenPrompts: TextPrompt[],
): string => givenPrompts
  .map(serialized)
  .join(', ');

export {
  allSerialized,
};
