import type {
  Branded,
} from '@/library/typeUtilities/Branded';

import {
  default as Attempt_Error_NonActionable,
} from './NonActionableError';

/** Extend this class to describe errors from which callers ought to recover */
abstract class Attempt_Error_Actionable<
  SomeBrand extends string,
> extends Error
  implements Branded<
  SomeBrand
> {
  public readonly brand!: SomeBrand;

  public throwAnyway = (
    givenJustification: string,
  ): never => {
    return Attempt_Error_NonActionable.throw(givenJustification, {
      cause  : this,
      thrower: this.throwAnyway,
    });
  };
}

export {
  Attempt_Error_Actionable as default,
};
