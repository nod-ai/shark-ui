import type {
  Attempt_Outcome_Discriminant,
} from '../Discriminant';

interface Attempt_Outcome_Discriminable_SyntacticallySugarfree<
  SomeDiscriminant extends Attempt_Outcome_Discriminant,
> {
  readonly discriminant: SomeDiscriminant;
}

export type {
  Attempt_Outcome_Discriminable_SyntacticallySugarfree,
};
