import type {
  Is,
  Not,
} from '@/library/typeUtilities';

import type {
  Attempt_Error,
} from '../../Error';

import type {
  Attempt_Outcome_Discriminant,
} from '../Discriminant';

import type {
  Attempt_Outcome_Discriminable_SyntacticallySugarfree,
} from './SyntacticallySugarfree';

interface Attempt_Outcome_Discriminable<
  SomeDiscriminant extends Attempt_Outcome_Discriminant,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  SomePayload extends (
    SomeDiscriminant extends 'success'
      ? unknown
      : Attempt_Error.Actionable<string>
  ),
>
  extends Attempt_Outcome_Discriminable_SyntacticallySugarfree<
    SomeDiscriminant
  > {
  readonly isSuccess: Is<this['discriminant'], 'success'>;
  readonly isFailure: Not<this['isSuccess']>;
}

export type {
  Attempt_Outcome_Discriminable,
};
