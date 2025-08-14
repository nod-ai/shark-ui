import HTTP from '@/library/HTTP';

import {
  ShimmedStabilityAIClient_Version1_Image,
} from './Image';

class ShimmedStabilityAIClient_Version1
  extends HTTP.Client {
  private cachedClient?: ShimmedStabilityAIClient_Version1_Image;

  public get image(): ShimmedStabilityAIClient_Version1_Image {
    this.cachedClient ??= new ShimmedStabilityAIClient_Version1_Image(this.origin, this.headers);
    return this.cachedClient;
  }
}

export {
  ShimmedStabilityAIClient_Version1,
};
