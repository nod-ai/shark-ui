const lastCharacterOf = (
  givenCharacters: string,
): string | null => {
  return givenCharacters[givenCharacters.length - 1] ?? null;
};

export {
  lastCharacterOf,
};
