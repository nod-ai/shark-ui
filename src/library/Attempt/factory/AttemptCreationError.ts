import NonActionableError from '../error/NonActionableError';

class AttemptCreationError
  extends NonActionableError {
  public override name = 'AttemptCreationError' as const;
  public override readonly cause: Error;

  private constructor(
    givenMessage: NonActionableError['message'],
    givenOptions: {
      cause: Error;
    },
  ) {
    super(givenMessage, givenOptions);
    this.cause = givenOptions.cause;
  }

  private static readonly message = [
    'Fresh attempt found a potentially actionable error that bypassed the outcome handler.',
    'Find the culprit and wrap it with `Attempt.to` or `Attempt.toEventually`.',
  ].join('\n');

  public static override rethrow(
    givenEvidence: Error,
  ): never {
    return super.rethrow(givenEvidence, {
      message: this.message,
    });
  }
}

export {
  AttemptCreationError as default,
};
