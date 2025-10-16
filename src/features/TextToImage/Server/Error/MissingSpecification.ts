import {
  Data,
} from 'effect';

import type URLComponent from '@/library/URLComponent';

class TextToImage_Server_Error_MissingSpecification
  extends Data.TaggedError(
    'TextToImage_Server_Error_MissingSpecification',
  )<{
    message: string;
  }> {
  public constructor(
    public readonly environmentKey: string,
    public readonly file: URLComponent.Path,
    public readonly endpoint: URLComponent.Path,
  ) {
    super({
      message: 'Failed to determine text-to-image server',
    });
  }
}

export {
  TextToImage_Server_Error_MissingSpecification,
};
