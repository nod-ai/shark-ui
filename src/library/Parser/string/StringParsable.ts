import type {
  Parsable,
} from '../Parsable';

import type ParsingError from '../ParsingError';

import type {
  StaticStringParser,
} from './StaticStringParser';

/**
 * Some classes need a factory that parses strings into an instance.
 * Implement this type to ensure that the class follows the standard interface for this.
 */
type StringParsable<
  SomeImplementer extends StaticStringParser<
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
  StringParsable,
};
