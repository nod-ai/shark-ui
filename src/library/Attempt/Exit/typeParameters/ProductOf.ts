import type {
  Attempt_Error,
} from '../../Error';

import type {
  Attempt_Exit_Success,
} from '../Success';

import type {
  Attempt_Exit,
} from '../definition.declared.ts';

type ProductOf<
  SomeOutcome extends Attempt_Exit<unknown, Attempt_Error.Actionable<string>>,
> = SomeOutcome extends Attempt_Exit_Success<infer NestedProduct>
  ? NestedProduct
  : never;

export type {
  ProductOf,
};
