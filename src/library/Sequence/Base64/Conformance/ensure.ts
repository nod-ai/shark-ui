import Attempt from '@/library/Attempt';

import {
  Sequence_Base64_pattern,
} from '../pattern';

import {
  _default as Sequence_Base64_Conformance_Error,
} from './Error';

const Sequence_Base64_Conformance_ensure = (
  givenCharacterSequence: string,
): Attempt.Outcome<
  string,
  Sequence_Base64_Conformance_Error
> => Attempt.Fresh_that((ends) => {
  if (
    !Sequence_Base64_pattern.test(givenCharacterSequence)
  ) return ends.inFailureDueTo(new Sequence_Base64_Conformance_Error());

  return ends.inSuccessWith(givenCharacterSequence);
});

export {
  Sequence_Base64_Conformance_ensure,
};
