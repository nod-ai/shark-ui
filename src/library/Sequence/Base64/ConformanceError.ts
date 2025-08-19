import Attempt from '@/library/Attempt';
import Base64 from '@/library/Base64';

class Sequence_Base64_ConformanceError
  extends Attempt.ActionableError<
  'Sequence_Base64_ConformanceError'
> {
  public override name = 'Sequence_Base64_ConformanceError' as const;

  public constructor() {
    super(`Sequence contained 1+ character(s) outside of the Base64 Alphabet: ${Base64.Alphabet.pattern.toString()}`);
  }
}

export {
  Sequence_Base64_ConformanceError as default,
};
