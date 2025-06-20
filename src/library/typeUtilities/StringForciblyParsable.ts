import type {
  StaticForcibleStringParser,
} from './StaticForcibleStringParser';

type StringForciblyParsable<
  SomeClassType extends StaticForcibleStringParser<
    SomeClassType['prototype']
  >,
> = SomeClassType['prototype'];

export type {
  StringForciblyParsable,
};
