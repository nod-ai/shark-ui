import type {
  StaticStringParser,
} from './StaticStringParser';

/**
 * Some classes need a factory that parses strings into an instance.
 * Implement this type to ensure that the class follows the standard interface for this.
 */
type StringParsable<
  SomeClassType extends StaticStringParser<
    SomeClassType['prototype']
  >,
> = SomeClassType['prototype'];

export type {
  StringParsable,
};
