import type {
  Branded,
} from '@/library/typeUtilities/Branded';

/**
 * Errors from which normal execution cannot be recovered.
 *
 * Applies to errors that the developer neglected to prevent, or that are
 * impossible to handle.
 */
class NonActionableError
  extends Error
  implements Branded<'NonActionableError'> {
  public readonly brand!: 'NonActionableError';

  private constructor(
    givenMessage: NonActionableError['message'],
    givenOptions?: ErrorOptions,
  ) {
    super(givenMessage, givenOptions);
    this.name = 'NonActionableError';
  }

  public throw(): never {
    // `throw` is allowed here since it's used within the construct designed to replace it.
    throw this; // eslint-disable-line no-restricted-syntax
  }

  public static throw = (
    givenMessage: NonActionableError['message'],
    givenOptions?: ErrorOptions,
    givenCaller?: (...parameters: any[]) => unknown, // eslint-disable-line @typescript-eslint/no-explicit-any
  ): never => {
    const newError = new NonActionableError(givenMessage, givenOptions);

    if (
      ('captureStackTrace' in Error)
      && (Error.captureStackTrace instanceof Function)
    ) {
      Error.captureStackTrace.call(undefined, newError, givenCaller ?? NonActionableError.throw);
    }

    return newError.throw();
  };

  public static rethrow = (
    givenError: Error,
    given: {
      message: NonActionableError['message'];
    },
  ): never => {
    return this.throw(
      given.message,
      {
        cause: givenError,
      },
      NonActionableError.rethrow,
    );
  };
}

export {
  NonActionableError as default,
};
