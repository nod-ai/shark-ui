import Attempt from '@/library/Attempt';
import Base64_Alphabet from '@/library/Base64/Alphabet';

import Sequence_Base64_Character_ConformanceError from './ConformanceError';

const Sequence_Base64_Character_pattern = new RegExp(`^[${Base64_Alphabet.pattern.source}]+$`);

const Sequence_Base64_ensureConformanceOf = (
  givenCharacterSequence: string,
): Attempt.Outcome<string, Sequence_Base64_Character_ConformanceError> => Attempt.that((ends) => {
  if (
    !Sequence_Base64_Character_pattern.test(givenCharacterSequence)
  ) return ends.inFailureDueTo(new Sequence_Base64_Character_ConformanceError());

  return ends.inSuccessWith(givenCharacterSequence);
});

export {
  Sequence_Base64_ensureConformanceOf as ensureConformanceOf,
  Sequence_Base64_Character_ConformanceError as ConformanceError,
};
