import type Attempt from '@/library/Attempt';

import ParsingError from './ParsingError';

interface Parser<
  ParsableInput,
  ParsedOutput,
  SomeParsingError extends ParsingError<string>,
> {
  parsedFrom(givenSubject: ParsableInput): Attempt.Outcome<ParsedOutput, SomeParsingError>;
}

export {
  type Parser as default,
  ParsingError,
};
