import type {
  Branded,
} from '@/library/typeUtilities/Branded';

import {
  NonActionableError,
} from '.';

/** Extend this class to describe errors from which callers ought to recover */
abstract class ActionableError<SomeBrand extends string>
  extends Error
  implements Branded<SomeBrand> {
  public readonly brand!: SomeBrand;

  public throwAnyway(
    givenJustification: string,
  ): never {
    return NonActionableError.throw(givenJustification, {
      cause: this,
    });
  }
}

export {
  ActionableError as default,
};
