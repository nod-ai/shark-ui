import type {
  Is,
  If,
  Not,
} from '@/library/typeUtilities/boolean/Not';

import type {
  Attempt_Error_Actionable,
} from '../../Error';

type Attempt_Outcome_Discriminant = 'success' | 'failure';

interface Attempt_Outcome_Discriminable_SyntacticallySugarfree<
  SomeDiscriminant extends Attempt_Outcome_Discriminant,
> {
  readonly discriminant: SomeDiscriminant;
}

interface Attempt_Outcome_Discriminable<
  SomeDiscriminant extends Attempt_Outcome_Discriminant,
  SomePayload extends (
    SomeDiscriminant extends 'success'
      ? unknown
      : Attempt_Error_Actionable<string>
  ),
> extends Attempt_Outcome_Discriminable_SyntacticallySugarfree<
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
    SomeTransformedPayload extends (
      SomeDiscriminant extends 'success'
        ? unknown
        : Attempt_Error_Actionable<string>
    ) = SomePayload,
  >(): Attempt_Outcome_Discriminable<SomeDiscriminant, SomeTransformedPayload>;
}

export type {
  Attempt_Outcome_Discriminable,
};
