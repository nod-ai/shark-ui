import {
  Data,
} from 'effect';

import {
  Attempt_Error_NonActionable,
} from './NonActionable';

/** Extend this class to describe errors from which callers ought to recover */
abstract class Attempt_Error_Actionable
  extends Data.Error<{
    message: string;
    cause?: Error;
  }> {
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
  Attempt_Error_Actionable,
};
