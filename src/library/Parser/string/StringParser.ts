import type ParsingError from '../ParsingError';
import type Parser from '../definition';

type StringParser<
  SomeParsedOutput,
  SomeParsingError extends ParsingError<string>,
> = Parser<string, SomeParsedOutput, SomeParsingError>;

export type {
  StringParser,
};
