import type {
  Parser_String_Static,
} from './Static';

declare module './definition.ts' {
  namespace Parser_String {
    export type {
      Parser_String_Static as Static,
    };
  }
}
