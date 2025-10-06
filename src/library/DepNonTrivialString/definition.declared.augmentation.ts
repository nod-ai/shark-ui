import {
  NonTrivialString_ParsingError,
} from './ParsingError';

import {
  DepNonTrivialString,
} from './definition.declared.ts';

DepNonTrivialString.ParsingError = NonTrivialString_ParsingError;

declare module './definition.declared.ts' {
  namespace DepNonTrivialString {
    export {
      NonTrivialString_ParsingError as ParsingError,
    };
  }
}
