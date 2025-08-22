import type {
  Parser_Static,
} from './Static';

import type {
  Parser_String_Static,
} from './StaticString';

import type {
  Parser_String,
} from './String';

declare module './definition.ts' {
  namespace Parser {
    export type {
      Parser_Static as Static,
      Parser_String_Static as String_Static,
      Parser_String as String,
    };
  }
}
