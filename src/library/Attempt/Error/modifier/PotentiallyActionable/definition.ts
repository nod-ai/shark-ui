import type {
  _default as Attempt_Error_NonActionable,
} from '../../NonActionable';

type PotentiallyActionable<
  SomeError extends Error,
> = Exclude<SomeError, Attempt_Error_NonActionable>;

export type {
  PotentiallyActionable as _default,
};
