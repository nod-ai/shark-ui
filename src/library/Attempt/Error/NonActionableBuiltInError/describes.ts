import type {
  _default as NonActionableBuiltInError,
} from './definition.ts';

const NonActionableBuiltInError_describes = (
  givenError: Error,
): givenError is NonActionableBuiltInError => (
  (givenError instanceof ReferenceError)
  || (givenError instanceof TypeError)
  || (givenError instanceof RangeError)
  || (givenError instanceof URIError)
  || (givenError instanceof EvalError)
  || (givenError instanceof SyntaxError)
);

export {
  NonActionableBuiltInError_describes,
};
