import {
  ParsingError,
} from '@/library/Parser';

class TextToImage_Config_ParsingError
  extends ParsingError<
  'TextToImage_Config'
> {
  public override name = 'TextToImage_Config_ParsingError' as const;

  public constructor(
    givenMessage: string,
  ) {
    super(`Config could not be parsed. ${givenMessage}`);
  }
}

export {
  TextToImage_Config_ParsingError,
};
