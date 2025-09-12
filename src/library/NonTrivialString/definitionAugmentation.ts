import {
  NonTrivialString_ParsingError,
} from './ParsingError';

import {
  NonTrivialString,
} from './definition.declared.ts';

NonTrivialString.ParsingError = NonTrivialString_ParsingError;

declare module './definition.declared.ts' {
  namespace NonTrivialString {
    export {
      NonTrivialString_ParsingError as ParsingError,
    };
  }
}
