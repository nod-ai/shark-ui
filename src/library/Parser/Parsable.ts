import type ParsingError from './ParsingError';

import type {
  Parser_Static,
} from './StaticParser';

/**
 * Some classes need a factory that parses an unknown subject into an instance.
 * Implementing this type ensures conformance to a standard parsing interface.
 */
type Parsable<
  SomeImplementer extends Parser_Static<
    SomeRawInput,
    SomeImplementer['prototype'],
    SomeParsingError
  >,
  SomeParsingError extends ParsingError<string> = ParsingError<string>,
  SomeRawInput = unknown,
> = SomeImplementer['prototype'];

export type {
  Parsable,
};
