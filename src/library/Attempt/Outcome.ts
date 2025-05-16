import type {
  Is,
  If,
  Not,
} from '@/library/typeUtilities/Boolean';
import type {
  Filter,
} from '@/library/typeUtilities/Filter';

import {
  type ActionableError,
} from './error';

// cspell:words sugarfree discriminable
interface SyntacticallySugarfreeDiscriminableOutcome {
  readonly case: 'success' | 'failure';
}

interface DiscriminableOutcome<
  SomeProduct,
> extends SyntacticallySugarfreeDiscriminableOutcome {
  readonly isSuccess: Is<this['case'], 'success'>;
  readonly isFailure: Not<this['isSuccess']>;

  optionallyUnwrap(): If<this['isSuccess'],
    SomeProduct,
    null
  >;

  forciblyUnwrap(): If<this['isSuccess'],
    SomeProduct,
    never
  >;
}

interface SemanticallySugarfreeSuccess<SomeProduct> extends DiscriminableOutcome<SomeProduct> {
  readonly case: 'success';
  readonly product: SomeProduct;
}

interface SemanticallySugarfreeFailure<
  SomeActionableError extends ActionableError<string>,
> extends DiscriminableOutcome<unknown> {
  readonly case: 'failure';
  readonly cause: SomeActionableError;
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

interface Failure<
  SomeActionableError extends ActionableError<string>,
> extends SemanticallySugarfreeFailure<SomeActionableError> {
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
  SomeActionableError extends ActionableError<string>,
> =
  | Success<SomeProduct>
  | Failure<SomeActionableError>;

type Sugarfree<
  SomeOutcome extends Outcome<unknown, ActionableError<string>>,
> = Filter<SomeOutcome,
| 'case'
| 'product'
| 'cause'
>;

const sugarfreeFailureDueTo = <
  SomeProduct,
  SomeActionableError extends ActionableError<string>,
>(
  givenError: SomeActionableError,
): Sugarfree<Outcome<SomeProduct, SomeActionableError>> => ({
  case : 'failure',
  cause: givenError,
});

const sugarfreeSuccessThatYielded = <
  SomeProduct,
  SomeActionableError extends ActionableError<string>,
>(
  givenProduct: SomeProduct,
): Sugarfree<Outcome<SomeProduct, SomeActionableError>> => ({
  case   : 'success',
  product: givenProduct,
});

const withSugar = <
  SomeProduct,
  SomeActionableError extends ActionableError<string>,
>(
  given: Sugarfree<Outcome<SomeProduct, SomeActionableError>>,
): Outcome<SomeProduct, SomeActionableError> => {
  switch (given.case) {
    case 'success': return {
      ...given,
      isSuccess       : true,
      isFailure       : false,
      optionallyUnwrap: () => given.product,
      forciblyUnwrap  : () => given.product,
      productOfSuccess: given.product,
    };
    case 'failure': return {
      ...given,
      isSuccess       : false,
      isFailure       : true,
      optionallyUnwrap: () => null,
      forciblyUnwrap  : () => given.cause.throwAnyway(),
      causeOfFailure  : given.cause,
    };
  }
};

const failureDueTo = <
  SomeProduct,
  SomeActionableError extends ActionableError<string>,
>(
  givenError: SomeActionableError,
): Outcome<SomeProduct, SomeActionableError> => {
  return withSugar(
    sugarfreeFailureDueTo(givenError),
  );
};

const successThatYielded = <
  SomeProduct,
  SomeActionableError extends ActionableError<string>,
>(
  givenProduct: SomeProduct,
): Outcome<SomeProduct, SomeActionableError> => {
  return withSugar(
    sugarfreeSuccessThatYielded(givenProduct),
  );
};

const Outcome = {
  failureDueTo,
  successThatYielded,
};

export default Outcome;
