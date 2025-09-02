import type ParsingError from '@/library/ParsingError';

import type {
  Static,
} from '@/library/typeUtilities';

import type {
  Parser,
} from './definition.ts';

type Parser_Static<
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
  Parser_Static,
};
