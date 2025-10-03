import type {
  Branded,
} from '@/library/typeUtilities';

import type {
  Attempt_Error_Interpreter,
} from './Interpreter';

import {
  Attempt_Error_NonActionable,
} from './NonActionable';

import {
  NonActionableBuiltInError,
} from './NonActionableBuiltInError';

import {
  type AppropriatelyThrown,
  PotentiallyActionable,
} from './modifiers';

/** Extend this class to describe errors from which callers ought to recover */
abstract class Attempt_Error_Actionable<
  SomeBrand extends string,
>
  extends Error
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

  public static from<
    SomeActionableError extends Attempt_Error_Actionable<string>,
  >(
    givenError: AppropriatelyThrown<Error>,
    {
      using: interpretationOf,
    }: {
      using: Attempt_Error_Interpreter<SomeActionableError>;
    },
  ): SomeActionableError {
    const potentiallyActionableError = PotentiallyActionable.assume(givenError);
    const definitelyActionableError = interpretationOf(potentiallyActionableError);

    if (
      definitelyActionableError !== null
    ) return definitelyActionableError;

    return Attempt_Error_NonActionable.rethrow(potentiallyActionableError, {
      message: NonActionableBuiltInError.describes(givenError)
        ? 'Neglected to prevent built-in error'
        : 'Neglected to interpret or prevent potentially actionable error',
    });
  }
}

export {
  Attempt_Error_Actionable,
};
