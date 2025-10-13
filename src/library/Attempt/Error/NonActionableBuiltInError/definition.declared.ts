import {
  NonActionableBuiltInError_describes,
} from './describes';

import './globalAugmentations';

/**
 * Error classes whose only plausible cause is a programmer bug or a violated language/runtime invariant.
 *
 * These errors are not expected to be caught or handled in any way.
 */
type NonActionableBuiltInError =
  | ReferenceError // Something was referenced that doesn't exist in scope.
  | TypeError // Something was called/iterated/assigned that can’t possibly support that operation.
  | RangeError // Runtime was asked to create an impossible value.
  | URIError // An illegal escape sequence was passed to decodeURI/encodeURI.
  | EvalError // Something illegal was done with `eval` or `Function` constructor.
  | SyntaxError // The JS engine couldn't even parse the code.
;

const NonActionableBuiltInError = {
  describes: NonActionableBuiltInError_describes,
};

export {
  NonActionableBuiltInError,
};
