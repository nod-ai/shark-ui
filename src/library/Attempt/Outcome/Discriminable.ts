import type {
  Is,
  If,
  Not,
} from '@/library/typeUtilities/Boolean';

type Attempt_Outcome_Discriminant = 'success' | 'failure';

// cspell:words sugarfree discriminable
interface SyntacticallySugarfreeDiscriminableOutcome<
  SomeDiscriminant extends Attempt_Outcome_Discriminant = Attempt_Outcome_Discriminant,
> {
  readonly discriminant: SomeDiscriminant;
}

interface DiscriminableOutcome<
  SomeProduct,
> extends SyntacticallySugarfreeDiscriminableOutcome {
  readonly isSuccess: Is<this['discriminant'], 'success'>;
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
