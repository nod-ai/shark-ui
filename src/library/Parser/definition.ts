import type Attempt from '@/library/Attempt';

import ParsingError from './ParsingError';

interface Parser<
  SomeParsableInput,
  SomeParsedOutput,
  SomeParsingError extends ParsingError<string>,
> {
  parsedFrom(givenSubject: SomeParsableInput): Attempt.Outcome<SomeParsedOutput, SomeParsingError>;
}

export {
  type Parser as default,
  ParsingError,
};
