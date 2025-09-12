import type Attempt from '@/library/Attempt';
import type ParsingError from '@/library/ParsingError';

interface Parser<
  SomeRawInput,
  SomeParsedOutput,
  SomeParsingError extends ParsingError<string>,
> {
  parsedFrom(givenSubject: SomeRawInput): Attempt.Outcome<
    SomeParsedOutput,
    SomeParsingError
  >;
}

export type {
  Parser,
};
