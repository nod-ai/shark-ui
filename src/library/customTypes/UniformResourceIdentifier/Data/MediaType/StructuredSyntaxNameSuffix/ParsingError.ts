import {
  ParsingError,
} from '@/library/Parser';

class StructuredSyntaxNameSuffix_ParsingError
  extends ParsingError<
  'StructuredSyntaxNameSuffix'
> {
  public constructor(givenCases: readonly string[]) {
    super(`Expected structured syntax name suffix as one of ${givenCases.toString()}`);
    this.name = 'StructuredSyntaxNameSuffix_ParsingError';
  }
}

export {
  StructuredSyntaxNameSuffix_ParsingError,
};
