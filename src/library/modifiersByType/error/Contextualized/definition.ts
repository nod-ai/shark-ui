import {
  Contextualized_assume,
} from './assume';

import {
  Contextualized_cast,
} from './cast';

import {
  Contextualized_describes,
} from './describes';

type Contextualized<
  SomeError extends Error,
  SomeCause extends Error,
> =
  & SomeError
  & {
    cause: SomeCause;
  }
;

/** Utilities for identifying and casting `Error` instances as "contextualized" */
const Contextualized = {
  describes: Contextualized_describes,
  assume   : Contextualized_assume,
  cast     : Contextualized_cast,
};

export {
  Contextualized as _default,
};
