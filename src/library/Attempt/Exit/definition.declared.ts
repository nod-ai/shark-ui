import {
  Attempt_Error,
} from '../Error';

import type {
  Attempt_Exit_Exit,
} from './Exit';

type Attempt_Exit<
  SomeProduct,
  SomeActionableError extends Attempt_Error.Actionable<string>,
> = Attempt_Exit_Exit<
  SomeProduct,
  SomeActionableError
>;

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
