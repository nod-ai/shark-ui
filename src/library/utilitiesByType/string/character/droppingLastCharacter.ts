import {
  lastCharacterOf,
} from './lastCharacterOf';

const droppingLastCharacter = (givenCharacters: string): string => {
  return givenCharacters.substring(0, givenCharacters.length - 1);
};

export {
  lastCharacterOf,
  droppingLastCharacter,
};
