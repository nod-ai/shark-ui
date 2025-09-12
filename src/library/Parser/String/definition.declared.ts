import type ParsingError from '@/library/ParsingError';

import type {
  Parser,
} from '../definition.declared.ts';

type Parser_String<
  SomeParsedOutput,
  SomeParsingError extends ParsingError<string>,
> = Parser<
  string,
  SomeParsedOutput,
  SomeParsingError
>;

export type {
  Parser_String,
};
