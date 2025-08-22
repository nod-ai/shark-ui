import type {
  Parser_Static,
} from './Static';

import type {
  Parser_String_Static,
} from './StaticString';

declare module './definition.ts' {
  namespace Parser {
    export type {
      Parser_Static as Static,
      Parser_String_Static as String_Static,
    };
  }
}
