import type {
  Branded,
} from '@/library/typeUtilities/Branded';

interface Attempt_Error_NonActionable_Options
  extends ErrorOptions {
  /** A function that's acting as an alternative to raw `throw` */
  thrower?: (...parameters: any[]) => unknown; // eslint-disable-line @typescript-eslint/no-explicit-any
}

/**
 * Errors from which normal execution cannot be recovered.
 *
 * Applies to errors that the developer neglected to prevent, or that are
 * impossible to handle.
 */
class Attempt_Error_NonActionable
  extends Error
  implements Branded<
  'NonActionableError'
> {
  public override name = 'NonActionableError';
  public readonly brand!: 'NonActionableError';

  public constructor(
    givenMessage: Attempt_Error_NonActionable['message'],
    givenOptions?: ErrorOptions,
  ) {
    super(givenMessage, givenOptions);
  }

  public throw(): never {
    // `throw` is allowed here since it's used within the construct designed to replace it.
    throw this; // eslint-disable-line no-restricted-syntax
  }

  public static throw(
    givenMessage: Attempt_Error_NonActionable['message'],
    givenOptions?: Attempt_Error_NonActionable_Options,
  ): never {
    const newError = new this(givenMessage, givenOptions);

    if (
      ('captureStackTrace' in Error)
      && (Error.captureStackTrace instanceof Function)
    ) Error.captureStackTrace.call(undefined, newError, givenOptions?.thrower ?? this.throw); // eslint-disable-line @typescript-eslint/unbound-method -- `captureStackTrace` doesn't call the method, it only notes its reference

    return newError.throw();
  }

  public static rethrow(
    givenError: Error,
    given: {
      message: Attempt_Error_NonActionable['message'];
    },
  ): never {
    if (
      givenError instanceof Attempt_Error_NonActionable
    ) return givenError.throw();

    return this.throw(given.message, {
      cause  : givenError,
      thrower: this.rethrow, // eslint-disable-line @typescript-eslint/unbound-method -- `captureStackTrace` doesn't call the method, it only notes its reference
    });
  }

  /** The error being "escorted" across the call stack by this instance, if any */
  public get charge(): Error | null {
    if (
      this.cause instanceof Error
    ) return this.cause;

    return null;
  }
}

export {
  Attempt_Error_NonActionable as default,
};
