import type NonActionableError from '../NonActionableError';

type PotentiallyActionable<
  SomeError extends Error,
> = Exclude<SomeError, NonActionableError>;

export type {
  PotentiallyActionable as default,
};
