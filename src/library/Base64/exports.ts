import Base64_Alphabet from './Alphabet';
import * as Base64_CharacterSequence from './CharacterSequence';

const Base64_bitWidth = Math.log2(Base64_Alphabet.length);

export {
  Base64_Alphabet as Alphabet,
  Base64_bitWidth as bitWidth,
  Base64_CharacterSequence as CharacterSequence,
};
