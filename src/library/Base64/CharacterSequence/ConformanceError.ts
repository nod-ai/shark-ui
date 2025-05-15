import Base64_Alphabet from '../Alphabet';

class Base64_CharacterSequence_ConformanceError extends Error {
  public constructor() {
    super(`Sequence contained 1+ character(s) outside of the Base64 Alphabet: ${Base64_Alphabet.pattern.toString()}`);
    this.name = 'Base64_CharacterSequence_ConformanceError';
  }
}

export default Base64_CharacterSequence_ConformanceError;
