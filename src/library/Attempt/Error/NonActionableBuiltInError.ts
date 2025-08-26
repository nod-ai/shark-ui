import type {
  Branded,
} from '@/library/typeUtilities/Branded';

// These augmentations allow TypeScript to distinguish these error types from `Error` at the annotation level.
declare global {
  interface ReferenceError
    extends Branded<
    'ReferenceError'
  > {
    readonly brand: this['name'];
  }

  interface TypeError
    extends Branded<
    'TypeError'
  > {
    readonly brand: this['name'];
  }

  interface RangeError
    extends Branded<
    'RangeError'
  > {
    readonly brand: this['name'];
  }

  interface URIError
    extends Branded<
    'URIError'
  > {
    readonly brand: this['name'];
  }

  interface EvalError
    extends Branded<
    'EvalError'
  > {
    readonly brand: this['name'];
  }

  interface SyntaxError
    extends Branded<
    'SyntaxError'
  > {
    readonly brand: this['name'];
  }
}

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

const isNonActionableBuiltInError = (
  givenError: Error,
): givenError is NonActionableBuiltInError => (
  (givenError instanceof ReferenceError)
  || (givenError instanceof TypeError)
  || (givenError instanceof RangeError)
  || (givenError instanceof URIError)
  || (givenError instanceof EvalError)
  || (givenError instanceof SyntaxError)
);

const NonActionableBuiltInError = {
  describes: isNonActionableBuiltInError,
};

export {
  NonActionableBuiltInError as default,
};
