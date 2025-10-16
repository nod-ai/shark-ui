import {
  Data,
} from 'effect';

/** Extend this class to describe errors from which callers ought to recover */
abstract class Attempt_Error_Actionable
  extends Data.Error<{
    message: string;
    cause?: Error;
  }> {
}

export {
  Attempt_Error_Actionable,
};
