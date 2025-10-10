import {
  Attempt_Error,
} from '../Error';

const Attempt_Outcome_die = Attempt_Error.NonActionable.throw.bind(Attempt_Error.NonActionable);

export {
  Attempt_Outcome_die,
};
