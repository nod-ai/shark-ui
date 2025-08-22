import type {
  Parser_Static,
} from './Static';

import type {
  Parser_Static_String,
} from './StaticString';

declare module './definition.ts' {
  namespace Parser {
    export type {
      Parser_Static as Static,
      Parser_Static_String as Static_String,
    };
  }
}
