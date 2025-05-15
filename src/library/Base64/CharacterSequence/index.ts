import Base64_Alphabet from '../Alphabet';

import Base64_CharacterSequence_ConformanceError from './ConformanceError';

const CharacterSequence_pattern = new RegExp(`^[${Base64_Alphabet.pattern.source}]+$`);

const assertConformanceOf = (givenCharacterSequence: string): string => {
  if (
    !CharacterSequence_pattern.test(givenCharacterSequence)
  ) return new Base64_CharacterSequence_ConformanceError().throwAnyway();

  return givenCharacterSequence;
};

export {
  assertConformanceOf,
  Base64_CharacterSequence_ConformanceError as ConformanceError,
};
