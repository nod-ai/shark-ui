import type Static from '@/library/typeUtilities/Static.ts';
import type StringParser from '@/library/typeUtilities/StringParser.ts';

type StaticStringParser<
  SomeClassType extends
  & Static<
    SomeClassType['prototype']
  >
  & StringParser<
    SomeClassType['prototype']
  >,
> = SomeClassType['prototype'];

export type {
  StaticStringParser,
};
