import type ParsingError from '../ParsingError';

import type {
  StaticParser,
} from '../StaticParser';

type StaticStringParser<
  SomeParsedOutput,
  SomeParsingError extends ParsingError<string>,
> = StaticParser<
  string,
  SomeParsedOutput,
  SomeParsingError
>;

export type {
  StaticStringParser,
};
