import type Attempt from '@/library/Attempt';

import {
  type Parsable,
  Parse_instanceFrom,
} from '@/library/Parser';

import Schema from '@/library/Schema';
import * as WebAPI from '@/library/WebAPI';

import {
  TextToImage_Config_ParsingError,
} from './Config_ParsingError';

/** The user-provided settings for the text-to-image feature */
class TextToImage_Config
implements Parsable<
  typeof TextToImage_Config,
  /*  */ TextToImage_Config_ParsingError
> {
  public constructor(
    /** The details of the server that's providing text-to-image generation */
    public readonly server: WebAPI.Server | null,
  ) {}

  public static Schema = Schema
    .object({
      server: WebAPI.Server.Schema
        .nullable()
        .catch(null),
    })
    .transform($0 => new TextToImage_Config(
      $0.server,
    ));

  public static parsedFrom(
    givenSubject: unknown,
  ): Attempt.Outcome<
    TextToImage_Config,
    TextToImage_Config_ParsingError
  > {
    const parsedConfig = Parse_instanceFrom(givenSubject, {
      using      : this.Schema,
      failingWith: TextToImage_Config_ParsingError,
    });

    return parsedConfig;
  }
}

export {
  TextToImage_Config,
};
