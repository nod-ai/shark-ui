import type Attempt_Error_NonActionable from '../../NonActionable';

type PotentiallyActionable<
  SomeError extends Error,
> = Exclude<SomeError, Attempt_Error_NonActionable>;

export type {
  PotentiallyActionable as default,
};
