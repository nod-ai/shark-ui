import {
  Data,
} from 'effect';

import type URLComponent from '@/library/URLComponent';

class TextToImage_Config_Static_Reading_Error
  extends Data.TaggedError(
    'TextToImage_Config_Static_Reading_Error',
  )<{
    cause: Error;
    filePath: URLComponent.Path;
  }> {
  public override get message(): string {
    return `Failed to read config at "${this.filePath}".`;
  }
}

export {
  TextToImage_Config_Static_Reading_Error,
};
