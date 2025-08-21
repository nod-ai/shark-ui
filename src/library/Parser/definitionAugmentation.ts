import type {
  Parser_Static,
} from './Static';

import type {
  Parser_StaticString,
} from './StaticString';

declare module './definition.ts' {
  namespace Parser {
    export type {
      Parser_Static as Static,
      Parser_StaticString as StaticString,
    };
  }
}
