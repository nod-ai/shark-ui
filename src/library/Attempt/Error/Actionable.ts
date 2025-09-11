import type {
  Branded,
} from '@/library/typeUtilities';

import {
  Attempt_Error_NonActionable,
} from './NonActionable';

import {
  Attempt_Error_Actionable_from,
} from './assertActionable';

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

  public static from = Attempt_Error_Actionable_from;
}

export {
  Attempt_Error_Actionable,
};
