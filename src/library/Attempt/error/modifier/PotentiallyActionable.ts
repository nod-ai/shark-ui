import type Attempt_NonActionableError from '../NonActionableError';

type PotentiallyActionable<
  SomeError extends Error,
> = Exclude<SomeError, Attempt_NonActionableError>;

export type {
  PotentiallyActionable as default,
};
