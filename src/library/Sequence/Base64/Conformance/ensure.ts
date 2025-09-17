import Attempt from '@/library/Attempt';

import {
  Sequence_Base64_pattern,
} from '../pattern';

import {
  Sequence_Base64_Conformance_Error,
} from './Error';

const Sequence_Base64_Conformance_ensure = <
  SomeCharacterSequence extends string,
>(
  givenCharacterSequence: SomeCharacterSequence,
): Attempt.Outcome<
  SomeCharacterSequence,
  Sequence_Base64_Conformance_Error
> => Attempt.Fresh.that((ends) => {
  if (
    Sequence_Base64_pattern.test(givenCharacterSequence)
  ) return ends.inSuccessWith(givenCharacterSequence);

  const newConformanceError = new Sequence_Base64_Conformance_Error();
  return ends.inFailureDueTo(newConformanceError);
});

export {
  Sequence_Base64_Conformance_ensure,
};
