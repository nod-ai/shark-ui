import type ParsingError from '@/library/ParsingError';

import type {
  Parser_Static,
} from '../Static';

type Parser_StaticString<
  SomeParsedOutput,
  SomeParsingError extends ParsingError<string>,
> = Parser_Static<
  string,
  SomeParsedOutput,
  SomeParsingError
>;

export type {
  Parser_StaticString,
};
