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
  SomeExit extends Attempt_Exit<unknown, Attempt_Error.Actionable<string>>,
> = SomeExit extends Attempt_Exit_Success<infer NestedProduct>
  ? NestedProduct
  : never;

export type {
  ProductOf,
};
