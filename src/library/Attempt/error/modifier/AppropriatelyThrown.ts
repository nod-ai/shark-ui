import type ActionableError from '../ActionableError';

type AppropriatelyThrown<
  SomeError extends Error,
> = Exclude<
  SomeError,
  ActionableError<string>
>;

export type {
  AppropriatelyThrown as default,
};
