import type Static from '@/library/typeUtilities/Static';

import type ParsingError from '../ParsingError';

import type {
  StringParser,
} from './StringParser';

type StaticStringParser<
  Any,
> =
  & Static<
    Any
  >
  & StringParser<
    Any,
    ParsingError<string>
  >
;

export type {
  StaticStringParser,
};
