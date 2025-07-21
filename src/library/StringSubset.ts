import type {
  Branded,
} from '@/library/typeUtilities/Branded';

import {
  type StringLike,
  concatenated,
} from '@/library/utilitiesByType/string';

/**
 * When an open-ended `string` is too permissive, extend this class and provide a means to instantiate some subset
 */
abstract class StringSubset<
  SomeBrand extends string,
> extends String
  implements Branded<
  SomeBrand
> {
  public readonly brand!: SomeBrand;

  public appendedWith(
    givenSuffix: StringLike,
  ): string {
    return concatenated(this, givenSuffix);
  }

  public prependedWith(
    givenPrefix: StringLike,
  ): string {
    return concatenated(givenPrefix, this);
  }
}

export {
  StringSubset as default,
};
