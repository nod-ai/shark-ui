import type {
  Is,
  If,
  Not,
} from '@/library/typeUtilities/Boolean';

type Attempt_Outcome_Discriminant = 'success' | 'failure';

// cspell:words sugarfree discriminable
interface SyntacticallySugarfreeDiscriminableOutcome<
  SomeDiscriminant extends Attempt_Outcome_Discriminant,
> {
  readonly discriminant: SomeDiscriminant;
}

interface DiscriminableOutcome<
  SomePayload,
> extends SyntacticallySugarfreeDiscriminableOutcome<
  Attempt_Outcome_Discriminant
> {
  readonly isSuccess: Is<this['discriminant'], 'success'>;
  readonly isFailure: Not<this['isSuccess']>;

  optionallyUnwrap(): If<this['isSuccess'],
    SomePayload,
    null
  >;

  forciblyUnwrap(): If<this['isSuccess'],
    SomePayload,
    never
  >;
}

export type {
  DiscriminableOutcome,
};
