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

  public throwAnyway(): never {
    return NonActionableError.throw(
      'Implementation not specified for actionable error',
      {
        cause: this,
      },
    );
  }
}

export default ActionableError;
