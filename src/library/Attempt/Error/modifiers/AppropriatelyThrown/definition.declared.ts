import type {
  Attempt_Error_Actionable,
} from '../../Actionable';

import {
  AppropriatelyThrown_assume,
} from './assume';

type AppropriatelyThrown<
  SomeError extends Error,
> = Exclude<
  SomeError,
  Attempt_Error_Actionable<string>
>;

const AppropriatelyThrown = {
  assume: AppropriatelyThrown_assume,
};

export {
  AppropriatelyThrown,
};
