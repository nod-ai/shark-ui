import {
  Attempt_Error,
} from '../Error';

const Attempt_Exit_die = Attempt_Error.NonActionable.throw.bind(Attempt_Error.NonActionable);

export {
  Attempt_Exit_die,
};
