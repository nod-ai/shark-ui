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

export {
  isString,
  asString,
  emptyString,
  type EmptyString,
  isEmpty,
  lastCharacterOf,
  droppingLastCharacter,
};
