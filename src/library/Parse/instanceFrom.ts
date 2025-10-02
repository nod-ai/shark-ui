import {
  Either,
  Schema,
} from 'effect';

import Attempt from '@/library/Attempt';
import type ParsingError from '@/library/ParsingError';

const Parse_instanceFrom = <
  SomeDecodingOutput,
  SomeEncodingOutput,
  SomeParsingError extends ParsingError<string>,
>(
  givenSubject: unknown,
  {
    using: givenSchema,
    failingWith: GivenParsingError,
  }: {
    using: Schema.Schema<SomeDecodingOutput, SomeEncodingOutput>;
    failingWith: new (message: string) => SomeParsingError;
  },
): Attempt.Outcome<
  typeof givenSchema.Type,
  SomeParsingError
> => Attempt.Fresh.that((ends) => {
  const resultOfDecodingSubject = Schema.decodeUnknownEither(givenSchema)(givenSubject);

  if (
    Either.isRight(resultOfDecodingSubject)
  ) return ends.inSuccessWith(resultOfDecodingSubject.right);

  const newParsingError = new GivenParsingError(resultOfDecodingSubject.left.message);
  return ends.inFailureDueTo(newParsingError);
});

export {
  Parse_instanceFrom,
};
