import type Parser from '..';
import type ParsingError from '../ParsingError';

type StringParser<
  SomeParsedOutput,
  SomeParsingError extends ParsingError<string>,
> = Parser<string, SomeParsedOutput, SomeParsingError>;

export type {
  StringParser,
};
