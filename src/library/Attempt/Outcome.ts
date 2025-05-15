import type {
  Is,
  Not,
} from '@/library/typeUtilities/Boolean';
import type {
  Filter,
} from '@/library/typeUtilities/Filter';

// cspell:words sugarfree
interface SyntacticallySugarfreeEmptyOutcome {
  readonly case: 'success' | 'failure';
}

interface EmptyOutcome extends SyntacticallySugarfreeEmptyOutcome {
  readonly isSuccess: Is<this['case'], 'success'>;
  readonly isFailure: Not<this['isSuccess']>;
}

interface SemanticallySugarfreeSuccess<SomeProduct> extends EmptyOutcome {
  readonly case: 'success';
  readonly product: SomeProduct;
}

interface SemanticallySugarfreeFailure extends EmptyOutcome {
  readonly case: 'failure';
  readonly cause: Error;
}

interface Success<SomeProduct> extends SemanticallySugarfreeSuccess<SomeProduct> {
  /**
   * Semantic sugar for `product`; useful for juxtaposition against guard statements:
   * ```ts
   * ...
   *
   * if (
   *   someOutcome.isFailure
   * ) return null;
   *
   * return someOutcome.productOfSuccess;
   * ```
   */
  readonly productOfSuccess: this['product'];
}

interface Failure extends SemanticallySugarfreeFailure {
  /**
   * Semantic sugar for `cause`; useful for juxtaposition against guard statements:
   * ```ts
   * ...
   *
   * if (
   *   someOutcome.isSuccess
   * ) return;
   *
   * return NonActionableError.rethrow(someOutcome.causeOfFailure);
   * ```
   */
  readonly causeOfFailure: this['cause'];
}

type Outcome<
  SomeProduct,
> =
  | Success<SomeProduct>
  | Failure;

type Sugarfree<
  SomeOutcome extends Outcome<unknown>,
> = Filter<SomeOutcome,
| 'case'
| 'product'
| 'cause'
>;

const sugarfreeFailureDueTo = <
  SomeProduct,
>(
  givenError: Error,
): Sugarfree<Outcome<SomeProduct>> => ({
  case : 'failure',
  cause: givenError,
});

const sugarfreeSuccessThatYielded = <
  SomeProduct,
>(
  givenProduct: SomeProduct,
): Sugarfree<Outcome<SomeProduct>> => ({
  case   : 'success',
  product: givenProduct,
});

const withSugar = <
  SomeProduct,
>(
  given: Sugarfree<Outcome<SomeProduct>>,
): Outcome<SomeProduct> => {
  switch (given.case) {
    case 'success': return {
      ...given,
      isSuccess       : true,
      isFailure       : false,
      productOfSuccess: given.product,
    };
    case 'failure': return {
      ...given,
      isSuccess     : false,
      isFailure     : true,
      causeOfFailure: given.cause,
    };
  }
};

const failureDueTo = <
  SomeProduct,
>(
  givenError: Error,
): Outcome<SomeProduct> => {
  return withSugar<SomeProduct>(
    sugarfreeFailureDueTo(givenError),
  );
};

const successThatYielded = <
  SomeProduct,
>(
  givenProduct: SomeProduct,
): Outcome<SomeProduct> => {
  return withSugar(
    sugarfreeSuccessThatYielded(givenProduct),
  );
};

export const Success = {
  thatYielded: successThatYielded,
};

export const Failure = {
  dueTo: failureDueTo,
};

const Outcome = {
  Negative: Failure,
  Positive: Success,
};

export default Outcome;
