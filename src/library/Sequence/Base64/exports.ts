import Attempt from '@/library/Attempt';
import Base64 from '@/library/Base64';

import Sequence_Base64_ConformanceError from './ConformanceError';

const Sequence_Base64_pattern = new RegExp(`^[${Base64.Alphabet.pattern.source}]+$`);

const Sequence_Base64_ensureConformanceOf = (
  givenCharacterSequence: string,
): Attempt.Outcome<string, Sequence_Base64_ConformanceError> => Attempt.that((ends) => {
  if (
    !Sequence_Base64_pattern.test(givenCharacterSequence)
  ) return ends.inFailureDueTo(new Sequence_Base64_ConformanceError());

  return ends.inSuccessWith(givenCharacterSequence);
});

export {
  Sequence_Base64_ensureConformanceOf as ensureConformanceOf,
  Sequence_Base64_ConformanceError as ConformanceError,
};
