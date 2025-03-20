export const isString = (givenSubject: unknown): givenSubject is string => {
  return (typeof givenSubject === 'string');
};

export const emptyString = '';

export type EmptyString = typeof emptyString;

export const isEmpty = (givenSubject: string): givenSubject is EmptyString => {
  return givenSubject === emptyString;
};

export const lastCharacterOf = (givenCharacters: string): string | null => {
  return givenCharacters[givenCharacters.length - 1] ?? null;
};

export const droppingLastCharacter = (givenCharacters: string): string => {
  return givenCharacters.substring(0, givenCharacters.length - 1);
};
