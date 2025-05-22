import Attempt from '@/library/Attempt';

abstract class ParsingError<
  SomeSubject extends string,
> extends Attempt.ActionableError<`${SomeSubject}_ParsingError`> {
  public constructor(
    givenMessage: string,
    givenCause?: Error,
  ) {
    super(givenMessage, givenCause);
    this.name = 'ParsingError';
  }
}

export {
  ParsingError as default,
};
