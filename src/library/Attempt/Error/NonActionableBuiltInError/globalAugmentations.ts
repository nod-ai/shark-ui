import type {
  Branded,
} from '@/library/typeUtilities';

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
