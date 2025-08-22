import type {
  Parser_String_Static,
} from '../StaticString';

declare module './definition.ts' {
  namespace Parser_String {
    export type {
      Parser_String_Static as Static,
    };
  }
}
