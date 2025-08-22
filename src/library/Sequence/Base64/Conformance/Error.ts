import Attempt from '@/library/Attempt';
import Base64 from '@/library/Base64';

class Sequence_Base64_Conformance_Error
  extends Attempt.Error_Actionable<
  'Sequence_Base64_Conformance_Error'
> {
  public override name = 'Sequence_Base64_Conformance_Error' as const;

  public constructor() {
    super(`Sequence contained 1+ character(s) outside of the Base64 Alphabet: ${Base64.Alphabet.pattern.toString()}`);
  }
}

export {
  Sequence_Base64_Conformance_Error as default,
};
