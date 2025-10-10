import type {
  Attempt_Outcome_Discriminable,
} from '../Discriminable';

interface Attempt_Outcome_Success_SemanticallySugarfree<
  SomeProduct,
>
  extends Attempt_Outcome_Discriminable<
    'success'
  > {
  readonly product: SomeProduct;
}

export type {
  Attempt_Outcome_Success_SemanticallySugarfree,
};
