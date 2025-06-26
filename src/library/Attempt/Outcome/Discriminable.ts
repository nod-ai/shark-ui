import type {
  Is,
  If,
  Not,
} from '@/library/typeUtilities/Boolean';

import type {
  ActionableError,
} from '../error';

type Attempt_Outcome_Discriminant = 'success' | 'failure';

// cspell:words sugarfree discriminable
interface SyntacticallySugarfreeDiscriminableOutcome<
  SomeDiscriminant extends Attempt_Outcome_Discriminant,
> {
  readonly discriminant: SomeDiscriminant;
}

interface DiscriminableOutcome<
  SomeDiscriminant extends Attempt_Outcome_Discriminant,
  SomePayload extends (
    SomeDiscriminant extends 'success'
      ? unknown
      : ActionableError<string>
  ),
> extends SyntacticallySugarfreeDiscriminableOutcome<
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
}

export type {
  DiscriminableOutcome,
};
