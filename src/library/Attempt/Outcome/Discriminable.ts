import type {
  Is,
  If,
  Not,
} from '@/library/typeUtilities/Boolean';

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

export type {
  DiscriminableOutcome,
};
