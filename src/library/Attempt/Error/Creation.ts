import {
  Attempt_Error_NonActionable,
} from './NonActionable';

class Attempt_Error_Creation
  extends Attempt_Error_NonActionable {
  public override name = 'AttemptCreationError' as const;
  public override readonly cause: Error;

  private constructor(
    givenMessage: Attempt_Error_NonActionable['message'],
    givenOptions: {
      cause: Error;
    },
  ) {
    super(givenMessage, givenOptions);
    this.cause = givenOptions.cause;
  }

  private static readonly message = [
    'Fresh attempt found a potentially actionable error that bypassed the outcome constructor.',
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
  Attempt_Error_Creation,
};
