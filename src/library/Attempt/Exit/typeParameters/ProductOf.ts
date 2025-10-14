import type {
  Exit,
} from 'effect';

import type {
  Attempt_Error,
} from '../../Error';

type ProductOf<
  SomeExit extends Exit.Exit<unknown, Attempt_Error.Actionable>,
> = SomeExit extends Exit.Success<infer NestedProduct, never>
  ? NestedProduct
  : never;

export type {
  ProductOf,
};
