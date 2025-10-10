import {
  Attempt_Error,
} from '../Error';

import type {
  Attempt_Exit_Failure,
} from './Failure';

import type {
  Attempt_Exit_Success,
} from './Success';

type Attempt_Exit<
  SomeProduct,
  SomeActionableError extends Attempt_Error.Actionable<string>,
> =
  | Attempt_Exit_Success<SomeProduct>
  | Attempt_Exit_Failure<SomeActionableError>
;

function Attempt_Exit(
  namespaceOnly: never = Attempt_Error.NonActionable.throw(
    `Unexpected call of module augmentation provision for ${Attempt_Exit.name}.`,
  ),
): never {
  return namespaceOnly;
}

export {
  Attempt_Exit,
};
