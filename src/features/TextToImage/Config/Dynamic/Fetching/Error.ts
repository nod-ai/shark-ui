import {
  Data,
} from 'effect';

import type URLComponent from '@/library/URLComponent';

class TextToImage_Config_Dynamic_Fetching_Error
  extends Data.TaggedError(
    'TextToImage_Config_Dynamic_Fetching_Error',
  )<{
    message: string;
    cause: Error;
  }> {
  public constructor(
    public readonly endpoint: URLComponent.Path,
    givenCause: Error,
  ) {
    super({
      message: `Failed to fetch config from "${endpoint}".`,
      cause  : givenCause,
    });
  }
}

export {
  TextToImage_Config_Dynamic_Fetching_Error,
};
