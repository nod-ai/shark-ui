import Base64_Alphabet from './Alphabet';

const Base64 = {
  Alphabet: Base64_Alphabet,
  get bitWidth() {
    return Math.log2(this.Alphabet.length);
  },
};

export {
  Base64,
};
