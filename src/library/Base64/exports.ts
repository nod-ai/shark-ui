import * as Base64_CharacterSequence from '../Sequence/Base64';

import Base64_Alphabet from './Alphabet';

const Base64_bitWidth = Math.log2(Base64_Alphabet.length);

export {
  Base64_Alphabet as Alphabet,
  Base64_bitWidth as bitWidth,
  Base64_CharacterSequence as CharacterSequence,
};
