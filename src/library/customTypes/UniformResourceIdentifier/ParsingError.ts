import {
  ParsingError,
} from '@/library/Parser';

class URI_ParsingError
  extends ParsingError<
  'URI'
> {
  public constructor(givenMessage: string) {
    super(givenMessage);
    this.name = 'URI_ParsingError';
  }
}

export {
  URI_ParsingError as default,
};
