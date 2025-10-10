import type {
  Attempt_Exit_Discriminant,
} from '../Discriminant';

interface Attempt_Exit_Discriminable_SyntacticallySugarfree<
  SomeDiscriminant extends Attempt_Exit_Discriminant,
> {
  readonly discriminant: SomeDiscriminant;
}

export type {
  Attempt_Exit_Discriminable_SyntacticallySugarfree,
};
