import {
  ClientSDK,
} from 'stabilityai-client-typescript/lib/sdks';

import {
  ShimmedStabilityAIClient_Version1_Image,
} from './Image';

class ShimmedStabilityAIClient_Version1
  extends ClientSDK {
  private cachedClient?: ShimmedStabilityAIClient_Version1_Image;

  public get image(): ShimmedStabilityAIClient_Version1_Image {
    this.cachedClient ??= new ShimmedStabilityAIClient_Version1_Image(this._options);
    return this.cachedClient;
  }
}

export {
  ShimmedStabilityAIClient_Version1,
};
