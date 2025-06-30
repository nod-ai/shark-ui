const isString = (givenSubject: unknown): givenSubject is string => {
  return (typeof givenSubject === 'string');
};

const asString = (givenSubject: unknown): string => {
  if (
    isString(givenSubject)
  ) return givenSubject;

  return JSON.stringify(givenSubject);
};

const emptyString = '';

type EmptyString = typeof emptyString;

const isEmpty = (givenSubject: string): givenSubject is EmptyString => {
  return givenSubject === emptyString;
};

const lastCharacterOf = (givenCharacters: string): string | null => {
  return givenCharacters[givenCharacters.length - 1] ?? null;
};

const droppingLastCharacter = (givenCharacters: string): string => {
  return givenCharacters.substring(0, givenCharacters.length - 1);
};

type StringLike = string | String; // eslint-disable-line @typescript-eslint/no-wrapper-object-types -- means "both the auto-boxed and primitive types"

const concatenated = (
  ...givenOperands: (StringLike | null)[]
): string => {
  const concatenatableOperands = givenOperands.map($0 => $0?.toString() ?? '');
  const concatenatedOperands = concatenatableOperands.join('');
  return concatenatedOperands;
};

export {
  isString,
  asString,
  emptyString,
  type EmptyString,
  isEmpty,
  lastCharacterOf,
  droppingLastCharacter,
  type StringLike,
  concatenated,
};
