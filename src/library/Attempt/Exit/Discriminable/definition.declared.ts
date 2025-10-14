import type {
  Attempt_Exit_Discriminant,
} from '../Discriminant';

import type {
  Attempt_Exit_Discriminable_SyntacticallySugarfree,
} from './SyntacticallySugarfree';

type Attempt_Exit_Discriminable<
  SomeDiscriminant extends Attempt_Exit_Discriminant,
> = Attempt_Exit_Discriminable_SyntacticallySugarfree<
  SomeDiscriminant
>;

export type {
  Attempt_Exit_Discriminable,
};
