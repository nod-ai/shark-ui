import type {
  Attempt_Outcome_Discriminant,
} from '../Discriminant';

import type {
  Attempt_Outcome_Discriminable_SyntacticallySugarfree,
} from './SyntacticallySugarfree';

type Attempt_Outcome_Discriminable<
  SomeDiscriminant extends Attempt_Outcome_Discriminant,
> = Attempt_Outcome_Discriminable_SyntacticallySugarfree<
  SomeDiscriminant
>;

export type {
  Attempt_Outcome_Discriminable,
};
