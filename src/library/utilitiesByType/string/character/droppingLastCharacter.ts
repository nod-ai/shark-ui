const lastCharacterOf = (givenCharacters: string): string | null => {
  return givenCharacters[givenCharacters.length - 1] ?? null;
};

const droppingLastCharacter = (givenCharacters: string): string => {
  return givenCharacters.substring(0, givenCharacters.length - 1);
};

export {
  lastCharacterOf,
  droppingLastCharacter,
};
