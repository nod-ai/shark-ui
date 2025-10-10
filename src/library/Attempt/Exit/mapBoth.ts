import type {
  Attempt_Error,
} from '../Error';

import type {
  Attempt_Exit_Transformer,
} from './Transformer';

import type {
  Attempt_Exit,
} from './definition.declared.ts';

import {
  Attempt_Exit_failCause,
} from './failCause';

import {
  Attempt_Exit_isSuccess,
} from './isSuccess';

import {
  Attempt_Exit_succeed,
} from './succeed';

/**
 * Convenience method for:
 * 1. unwrapping the contents of _this_ outcome,
 * 2. transforming them, and
 * 3. wrapping the transformed contents in a _new_ outcome.
*
* Helps avoid boilerplate when transforming outcomes.
*/
const Attempt_Exit_mapBoth = <
  SomeTransformableProduct,
  SomeTransformableActionableError extends Attempt_Error.Actionable<string>,
  SomeTransformedProduct = SomeTransformableProduct,
  SomeTransformedActionableError extends Attempt_Error.Actionable<string> = SomeTransformableActionableError,
>(
  givenOutcome: Attempt_Exit<
    SomeTransformableProduct,
    SomeTransformableActionableError
  >,
  {
    onSuccess: toTransformedProduct,
    onFailure: toTransformedCause,
  }: Attempt_Exit_Transformer<
    SomeTransformableProduct,
    SomeTransformableActionableError,
    SomeTransformedProduct,
    SomeTransformedActionableError
  >,
): Attempt_Exit<
  SomeTransformedProduct,
  SomeTransformedActionableError
> => Attempt_Exit_isSuccess(givenOutcome)
  ? Attempt_Exit_succeed(
      toTransformedProduct(givenOutcome.value),
    )
  : Attempt_Exit_failCause(
      toTransformedCause(givenOutcome.cause),
    );

export {
  Attempt_Exit_mapBoth,
};
