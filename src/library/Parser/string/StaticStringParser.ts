import type Static from '@/library/typeUtilities/Static';

import type ParsingError from '../ParsingError';

import type {
  StringParser,
} from './StringParser';

type StaticStringParser<
  SomeParsedOutput,
  SomeParsingError extends ParsingError<string> = ParsingError<string>,
> =
  & Static<
    SomeParsedOutput
  >
  & StringParser<
    SomeParsedOutput,
    SomeParsingError
  >
;

export type {
  StaticStringParser,
};
