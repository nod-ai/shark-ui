import {
  Data,
} from 'effect';

import type URLComponent from '@/library/URLComponent';

class TextToImage_Server_Error_MissingSpecification
  extends Data.TaggedError(
    'TextToImage_Server_Error_MissingSpecification',
  )<{
    environmentKey: string;
    file: URLComponent.Path;
    endpoint: URLComponent.Path;
  }> {
  public override message = 'Failed to determine text-to-image server';
}

export {
  TextToImage_Server_Error_MissingSpecification,
};
