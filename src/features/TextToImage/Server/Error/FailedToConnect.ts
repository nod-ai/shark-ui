import type {
  HttpClientRequest,
} from '@effect/platform';

import {
  Data,
} from 'effect';

class TextToImage_Server_Error_FailedToConnect
  extends Data.TaggedError(
    'TextToImage_Server_Error_FailedToConnect',
  )<{
    request: HttpClientRequest.HttpClientRequest;
  }> {
  public override get message(): string {
    return `Failed to reach the text-to-image server at "${this.request.url}".`;
  }
}

export {
  TextToImage_Server_Error_FailedToConnect,
};
