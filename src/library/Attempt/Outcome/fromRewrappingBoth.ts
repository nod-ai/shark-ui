import type {
  Attempt_Error,
} from '../Error';

import type {
  Attempt_Outcome_Transformer,
} from './Transformer';

import type {
  Attempt_Outcome,
} from './definition.declared.ts';

/**
 * Convenience method for:
 * 1. unwrapping the contents of _this_ outcome,
 * 2. transforming them, and
 * 3. wrapping the transformed contents in a _new_ outcome.
*
* Helps avoid boilerplate when transforming outcomes.
*/
const Attempt_Outcome_fromRewrappingBoth = <
  SomeTransformableProduct,
  SomeTransformableActionableError extends Attempt_Error.Actionable<string>,
  SomeTransformedProduct = SomeTransformableProduct,
  SomeTransformedActionableError extends Attempt_Error.Actionable<string> = SomeTransformableActionableError,
>(
  givenOutcome: Attempt_Outcome<
    SomeTransformableProduct,
    SomeTransformableActionableError
  >,
  {
    product: toTransformedProduct,
    cause: toTransformedCause,
  }: Attempt_Outcome_Transformer<
    SomeTransformableProduct,
    SomeTransformableActionableError,
    SomeTransformedProduct,
    SomeTransformedActionableError
  >,
): Attempt_Outcome<
  SomeTransformedProduct,
  SomeTransformedActionableError
> => givenOutcome.isSuccess
  ? givenOutcome.rewrappedWith(toTransformedProduct)
  : givenOutcome.rewrappedWith(toTransformedCause);

export {
  Attempt_Outcome_fromRewrappingBoth,
};
