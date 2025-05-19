import type ForcibleStringParser from '@/library/typeUtilities/ForcibleStringParser';
import type Static from '@/library/typeUtilities/Static.ts';

type StringForciblyParsable<
  SomeClassType extends
  & Static<
    SomeClassType['prototype']
  >
  & ForcibleStringParser<
    SomeClassType['prototype']
  >,
> = SomeClassType['prototype'];

export type {
  StringForciblyParsable,
};
