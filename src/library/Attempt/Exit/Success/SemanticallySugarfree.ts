import type {
  Attempt_Exit_Discriminable,
} from '../Discriminable';

interface Attempt_Exit_Success_SemanticallySugarfree<
  SomeProduct,
>
  extends Attempt_Exit_Discriminable<
    'success'
  > {
  readonly value: SomeProduct;
}

export type {
  Attempt_Exit_Success_SemanticallySugarfree,
};
