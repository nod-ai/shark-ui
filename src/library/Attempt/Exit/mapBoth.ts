import {
  Cause,
} from 'effect';

import type {
  Attempt_Error,
} from '../Error';

import type {
  Attempt_Exit_Exit,
} from './Exit';

import type {
  Attempt_Exit_Transformer,
} from './Transformer';

import {
  Attempt_Exit_die,
} from './die';

import {
  Attempt_Exit_fail,
} from './fail';

import {
  Attempt_Exit_isSuccess,
} from './isSuccess';

import {
  Attempt_Exit_succeed,
} from './succeed';

/**
 * Convenience method for:
 * 1. unwrapping the contents of _this_ exit,
 * 2. transforming them, and
 * 3. wrapping the transformed contents in a _new_ exit.
*
* Helps avoid boilerplate when transforming exits.
*/
const Attempt_Exit_mapBoth = <
  SomeTransformableProduct,
  SomeTransformableActionableError extends Attempt_Error.Actionable<string>,
  SomeTransformedProduct = SomeTransformableProduct,
  SomeTransformedActionableError extends Attempt_Error.Actionable<string> = SomeTransformableActionableError,
>(
  givenExit: Attempt_Exit_Exit<
    SomeTransformableProduct,
    SomeTransformableActionableError
  >,
  {
    onSuccess: toTransformedProduct,
    onFailure: toTransformedError,
  }: Attempt_Exit_Transformer<
    SomeTransformableProduct,
    SomeTransformableActionableError,
    SomeTransformedProduct,
    SomeTransformedActionableError
  >,
): Attempt_Exit_Exit<
  SomeTransformedProduct,
  SomeTransformedActionableError
> => {
  if (
    Attempt_Exit_isSuccess(givenExit)
  ) return Attempt_Exit_succeed(
    toTransformedProduct(givenExit.value),
  );

  if (
    !Cause.isFailType(givenExit.cause)
  ) return Attempt_Exit_die(`Expected failure cause, got ${givenExit.cause._tag} instead`);

  return Attempt_Exit_fail(
    toTransformedError(givenExit.cause.error),
  );
};

export {
  Attempt_Exit_mapBoth,
};
