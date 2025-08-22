import type Parser from '@/library/Parser';
import type ParsingError from '@/library/ParsingError';

import type {
  Parsable,
} from './definition';

/**
 * Some classes need a factory that parses strings into an instance.
 * Implement this type to ensure that the class follows the standard interface for this.
 */
type Parsable_String<
  SomeImplementer extends Parser.String_Static<
    SomeImplementer['prototype'],
    SomeParsingError
  >,
  SomeParsingError extends ParsingError<string>,
> = Parsable<
  SomeImplementer,
  SomeParsingError,
  string
>;

export type {
  Parsable_String,
};
