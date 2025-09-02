import ParsingError from '@/library/ParsingError';

class Shortfin_TextToImage_SDXL_Client_Response_Body_ParsingError
  extends ParsingError<
    'Shortfin_TextToImage_SDXL_Client_Response_Body'
  > {
  public override name = 'Shortfin_TextToImage_SDXL_Client_Response_Body_ParsingError' as const;

  public constructor(
    givenMessage: string,
  ) {
    super(`Response body could not be parsed. ${givenMessage}`);
  }
}

export {
  Shortfin_TextToImage_SDXL_Client_Response_Body_ParsingError,
};
