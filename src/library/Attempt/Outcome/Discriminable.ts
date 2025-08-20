import type {
  Is,
  If,
  Not,
} from '@/library/typeUtilities/Boolean';

import type {
  Attempt_ActionableError,
} from '../error';

type Attempt_Outcome_Discriminant = 'success' | 'failure';

// cspell:words sugarfree discriminable
interface Attempt_SyntacticallySugarfreeDiscriminableOutcome<
  SomeDiscriminant extends Attempt_Outcome_Discriminant,
> {
  readonly discriminant: SomeDiscriminant;
}

interface Attempt_DiscriminableOutcome<
  SomeDiscriminant extends Attempt_Outcome_Discriminant,
  SomePayload extends (
    SomeDiscriminant extends 'success'
      ? unknown
      : Attempt_ActionableError<string>
  ),
> extends Attempt_SyntacticallySugarfreeDiscriminableOutcome<
  SomeDiscriminant
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

  rewrappedWith<
    TransformedPayload extends (
      SomeDiscriminant extends 'success'
        ? unknown
        : Attempt_ActionableError<string>
    ) = SomePayload,
  >(): Attempt_DiscriminableOutcome<SomeDiscriminant, TransformedPayload>;
}

export type {
  Attempt_DiscriminableOutcome,
};
