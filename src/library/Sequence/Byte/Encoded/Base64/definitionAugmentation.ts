import {
  Sequence_Byte_Encoded_Base64_ParsingError,
} from './ParsingError';

import {
  Sequence_Byte_Encoded_Base64,
} from './definition.ts';

Sequence_Byte_Encoded_Base64.ParsingError = Sequence_Byte_Encoded_Base64_ParsingError;

declare module './definition.ts' {
  namespace Sequence_Byte_Encoded_Base64 {
    export {
      Sequence_Byte_Encoded_Base64_ParsingError as ParsingError,
    };
  }
}
