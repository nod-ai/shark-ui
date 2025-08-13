import Attempt from '@/library/Attempt';
import type Schema from '@/library/Schema';

import type {
  default as ParsingError,
} from './ParsingError';

const Parse_instanceFrom = <
  SomeSchema extends Schema.ZodType,
  SomeParsingError extends ParsingError<string>,
>(
  givenSubject: unknown,
  {
    using: givenSchema,
    failingWith: GivenParsingError,
  }: {
    using: SomeSchema;
    failingWith: new (message: string) => SomeParsingError;
  },
): Attempt.Outcome<
  Schema.infer<SomeSchema>,
  SomeParsingError
> => Attempt.that((ends) => {
  const resultOfParsingSubject = givenSchema.safeParse(givenSubject);

  if (
    resultOfParsingSubject.success
  ) return ends.inSuccessWith(resultOfParsingSubject.data);

  const newParsingError = new GivenParsingError(resultOfParsingSubject.error.message);
  return ends.inFailureDueTo(newParsingError);
});

export {
  Parse_instanceFrom,
};
