import Base64_Alphabet from './Alphabet';

const Base64 = {
  Alphabet: Base64_Alphabet,
  get bitWidth() {
    return Math.log2(Base64_Alphabet.length);
  },
};

export {
  Base64,
};
