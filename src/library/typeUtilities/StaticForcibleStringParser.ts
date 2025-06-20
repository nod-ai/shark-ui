import type ForcibleStringParser from '@/library/typeUtilities/ForcibleStringParser';
import type Static from '@/library/typeUtilities/Static.ts';

type StaticForcibleStringParser<
  Any,
> =
  & Static<
    Any
  >
  & ForcibleStringParser<
    Any
  >;

export type {
  StaticForcibleStringParser,
};
