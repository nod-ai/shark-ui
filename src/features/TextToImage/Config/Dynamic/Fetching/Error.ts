import {
  Data,
} from 'effect';

import type URLComponent from '@/library/URLComponent';

class TextToImage_Config_Dynamic_Fetching_Error
  extends Data.TaggedError(
    'TextToImage_Config_Dynamic_Fetching_Error',
  )<{
    endpoint: URLComponent.Path;
    cause: Error;
  }> {
  public override get message(): string {
    return `Failed to fetch config from "${this.endpoint}".`;
  }
}

export {
  TextToImage_Config_Dynamic_Fetching_Error,
};
