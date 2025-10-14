import type {
  Attempt_Error,
} from '../../Error';

import type {
  Attempt_Exit_Exit,
} from '../Exit';

import type {
  Attempt_Exit_Success,
} from '../Success';

type ProductOf<
  SomeExit extends Attempt_Exit_Exit<unknown, Attempt_Error.Actionable>,
> = SomeExit extends Attempt_Exit_Success<infer NestedProduct>
  ? NestedProduct
  : never;

export type {
  ProductOf,
};
