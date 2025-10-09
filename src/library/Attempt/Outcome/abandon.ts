import {
  Attempt_Error,
} from '../Error';

const Attempt_Outcome_abandon = Attempt_Error.NonActionable.throw.bind(Attempt_Error.NonActionable);

export {
  Attempt_Outcome_abandon,
};
