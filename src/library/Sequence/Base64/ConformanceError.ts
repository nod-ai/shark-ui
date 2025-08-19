import Attempt from '@/library/Attempt';
import Base64_Alphabet from '@/library/Base64/Alphabet';

class Base64_CharacterSequence_ConformanceError
  extends Attempt.ActionableError<
  'Base64_CharacterSequence_ConformanceError'
> {
  public override name = 'Base64_CharacterSequence_ConformanceError' as const;

  public constructor() {
    super(`Sequence contained 1+ character(s) outside of the Base64 Alphabet: ${Base64_Alphabet.pattern.toString()}`);
  }
}

export {
  Base64_CharacterSequence_ConformanceError as default,
};
