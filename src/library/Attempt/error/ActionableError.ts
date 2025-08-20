import type {
  Branded,
} from '@/library/typeUtilities/Branded';

import {
  default as Attempt_NonActionableError,
} from './NonActionableError';

/** Extend this class to describe errors from which callers ought to recover */
abstract class Attempt_ActionableError<
  SomeBrand extends string,
> extends Error
  implements Branded<
  SomeBrand
> {
  public readonly brand!: SomeBrand;

  public throwAnyway = (
    givenJustification: string,
  ): never => {
    return Attempt_NonActionableError.throw(givenJustification, {
      cause  : this,
      thrower: this.throwAnyway,
    });
  };
}

export {
  Attempt_ActionableError as default,
};
