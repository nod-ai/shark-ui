import {
  ActionableError,
} from '@/library/Attempt/error';

class URI_ParsingError extends ActionableError<'URI_ParsingError'> {
  public constructor(givenMessage: string) {
    super(givenMessage);
    this.name = 'URI_ParsingError';
  }
}

export {
  URI_ParsingError as default,
};
