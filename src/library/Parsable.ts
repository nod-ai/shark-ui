import type Parser from '@/library/Parser';
import type ParsingError from '@/library/ParsingError';

/**
 * Some classes need a factory that parses an unknown subject into an instance.
 * Implementing this type ensures conformance to a standard parsing interface.
 */
type Parsable<
  SomeImplementer extends Parser.Static<
    SomeRawInput,
    SomeImplementer['prototype'],
    SomeParsingError
  >,
  SomeParsingError extends ParsingError<string> = ParsingError<string>,
  SomeRawInput = unknown,
> = SomeImplementer['prototype'];

export type {
  Parsable as default,
};
