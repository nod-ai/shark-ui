import {
  Option,
} from 'effect';

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
abstract class Attempt_Error_Actionable
  extends Error {
  public throwAnyway = (
    givenJustification: string,
  ): never => {
    return Attempt_Error_NonActionable.throw(givenJustification, {
      cause  : this,
      thrower: this.throwAnyway,
    });
  };

  public static from<
    SomeActionableError extends Attempt_Error_Actionable,
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

    return Option.getOrThrowWith(
      definitelyActionableError,
      () => new Error(
        NonActionableBuiltInError.describes(givenError)
          ? 'Neglected to prevent built-in error'
          : 'Neglected to interpret or prevent potentially actionable error',
        {
          cause: potentiallyActionableError,
        },
      ),
    );
  }
}

export {
  Attempt_Error_Actionable,
};
