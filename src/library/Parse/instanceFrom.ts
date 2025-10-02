import Attempt from '@/library/Attempt';
import type ParsingError from '@/library/ParsingError';
import type Schema_old from '@/library/Schema';

const Parse_instanceFrom = <
  SomeSchema extends Schema_old.ZodType,
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
  Schema_old.infer<SomeSchema>,
  SomeParsingError
> => Attempt.Fresh.that((ends) => {
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
