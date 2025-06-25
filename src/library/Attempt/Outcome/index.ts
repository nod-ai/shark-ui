import type {
  ActionableError,
} from '../error';

import {
  type Attempt_Failure,
  failureDueTo,
} from './Failure';

import {
  type Attempt_Success,
  successThatYielded,
} from './Success';

type Attempt_Outcome<
  SomeProduct,
  SomeActionableError extends ActionableError<string>,
> =
  | Attempt_Success<SomeProduct>
  | Attempt_Failure<SomeActionableError>
;

const Attempt_Outcome = {
  failureDueTo,
  successThatYielded,
};

type ProductOf<
  SomeOutcome extends Attempt_Outcome<unknown, ActionableError<string>>,
> = SomeOutcome extends Attempt_Success<infer NestedProduct>
  ? NestedProduct
  : never;

type CauseOf<
  SomeOutcome extends Attempt_Outcome<unknown, ActionableError<string>>,
> = SomeOutcome extends Attempt_Failure<infer NestedError>
  ? NestedError
  : never;

export {
  Attempt_Outcome,
  type Attempt_Success,
  type Attempt_Failure,
  type ProductOf,
  type CauseOf,
};
