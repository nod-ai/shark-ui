import type {
  Attempt_Error_Actionable,
} from '../../Error';

import type {
  Attempt_Outcome,
  Attempt_Outcome_Success,
} from '../definition.ts';

type ProductOf<
  SomeOutcome extends Attempt_Outcome<unknown, Attempt_Error_Actionable<string>>,
> = SomeOutcome extends Attempt_Outcome_Success<infer NestedProduct>
  ? NestedProduct
  : never;

export type {
  ProductOf,
};
