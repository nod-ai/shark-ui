import type Attempt_ActionableError from '../ActionableError';

type AppropriatelyThrown<
  SomeError extends Error,
> = Exclude<
  SomeError,
  Attempt_ActionableError<string>
>;

export type {
  AppropriatelyThrown as default,
};
