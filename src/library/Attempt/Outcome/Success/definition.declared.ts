import {
  Attempt_Error,
} from '../../Error';

import type {
  Attempt_Outcome_Success_SemanticallySugarfree,
} from './SemanticallySugarfree';

type Attempt_Outcome_Success<
  SomeProduct,
> = Attempt_Outcome_Success_SemanticallySugarfree<
  SomeProduct
>;

function Attempt_Outcome_Success(
  namespaceOnly: never = Attempt_Error.NonActionable.throw(
    `Unexpected call of module augmentation provision for "${Attempt_Outcome_Success.name}".`,
  ),
): never {
  return namespaceOnly;
}

export {
  Attempt_Outcome_Success,
};
