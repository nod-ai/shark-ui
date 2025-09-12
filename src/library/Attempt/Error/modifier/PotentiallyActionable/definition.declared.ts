import type {
  Attempt_Error_NonActionable,
} from '../../NonActionable';

import {
  PotentiallyActionable_assume,
} from './assume';

type PotentiallyActionable<
  SomeError extends Error,
> = Exclude<SomeError, Attempt_Error_NonActionable>;

const PotentiallyActionable = {
  assume: PotentiallyActionable_assume,
};

export {
  PotentiallyActionable,
};
