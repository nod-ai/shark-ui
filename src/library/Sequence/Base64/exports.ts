import Attempt from '@/library/Attempt';
import Base64_Alphabet from '@/library/Base64/Alphabet';

import Base64_CharacterSequence_ConformanceError from './ConformanceError';

const CharacterSequence_pattern = new RegExp(`^[${Base64_Alphabet.pattern.source}]+$`);

const ensureConformanceOf = (
  givenCharacterSequence: string,
): Attempt.Outcome<string, Base64_CharacterSequence_ConformanceError> => Attempt.that((ends) => {
  if (
    !CharacterSequence_pattern.test(givenCharacterSequence)
  ) return ends.inFailureDueTo(new Base64_CharacterSequence_ConformanceError());

  return ends.inSuccessWith(givenCharacterSequence);
});

export {
  ensureConformanceOf,
  Base64_CharacterSequence_ConformanceError as ConformanceError,
};
