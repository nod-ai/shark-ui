import type {
  Is,
  Not,
} from '@/library/typeUtilities';

import type {
  Attempt_Outcome_Discriminant,
} from '../Discriminant';

import type {
  Attempt_Outcome_Discriminable_SyntacticallySugarfree,
} from './SyntacticallySugarfree';

interface Attempt_Outcome_Discriminable<
  SomeDiscriminant extends Attempt_Outcome_Discriminant,
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
