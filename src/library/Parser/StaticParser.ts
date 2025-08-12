import type Static from '@/library/typeUtilities/Static';

import type ParsingError from './ParsingError';
import type Parser from './definition.ts';

type StaticParser<
  SomeRawInput,
  SomeParsedOutput,
  SomeParsingError extends ParsingError<string>,
> =
  & Static<
    SomeParsedOutput
  >
  & Parser<
    SomeRawInput,
    SomeParsedOutput,
    SomeParsingError
  >
;

export type {
  StaticParser,
};
