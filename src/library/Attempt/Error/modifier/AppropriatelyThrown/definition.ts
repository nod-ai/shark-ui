import type {
  default as Attempt_Error_Actionable,
} from '../../Actionable';

type AppropriatelyThrown<
  SomeError extends Error,
> = Exclude<
  SomeError,
  Attempt_Error_Actionable<string>
>;

export type {
  AppropriatelyThrown as default,
};
