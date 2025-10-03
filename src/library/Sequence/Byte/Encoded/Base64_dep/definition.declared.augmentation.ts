import {
  Sequence_Byte_Encoded_Base64_ParsingError,
} from './ParsingError';

import {
  Sequence_Byte_Encoded_Base64_dep,
} from './definition.declared.ts';

Sequence_Byte_Encoded_Base64_dep.ParsingError = Sequence_Byte_Encoded_Base64_ParsingError;

declare module './definition.declared.ts' {
  namespace Sequence_Byte_Encoded_Base64_dep {
    export {
      Sequence_Byte_Encoded_Base64_ParsingError as ParsingError,
    };
  }
}
