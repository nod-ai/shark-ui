import type {
  Parser_Static,
} from './Static';

import type {
  Parser_String,
} from './String';

declare module './definition.declared.ts' {
  namespace Parser {
    export {
      type Parser_Static as Static,
      type Parser_String as String,
    };
  }
}
