import {
  Attempt_Error,
} from '../../Error';

import type {
  Attempt_Exit_Success_SemanticallySugarfree,
} from './SemanticallySugarfree';

type Attempt_Exit_Success<
  SomeProduct,
> = Attempt_Exit_Success_SemanticallySugarfree<
  SomeProduct
>;

function Attempt_Exit_Success(
  namespaceOnly: never = Attempt_Error.NonActionable.throw(
    `Unexpected call of module augmentation provision for "${Attempt_Exit_Success.name}".`,
  ),
): never {
  return namespaceOnly;
}

export {
  Attempt_Exit_Success,
};
