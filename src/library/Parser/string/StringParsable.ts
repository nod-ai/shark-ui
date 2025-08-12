import type {
  StaticStringParser,
} from './StaticStringParser';

/**
 * Some classes need a factory that parses strings into an instance.
 * Implement this type to ensure that the class follows the standard interface for this.
 */
type StringParsable<
  SomeImplementer extends StaticStringParser<
    SomeImplementer['prototype']
  >,
> = SomeImplementer['prototype'];

export type {
  StringParsable,
};
