import {
  ClientSDK,
} from 'stabilityai-client-typescript/lib/sdks';

import {
  ShimmedStabilityAIClient_Version1,
} from './Version1';

class ShimmedStabilityAIClient
  extends ClientSDK {
  private cachedClient?: ShimmedStabilityAIClient_Version1;

  public get version1(): ShimmedStabilityAIClient_Version1 {
    this.cachedClient ??= new ShimmedStabilityAIClient_Version1(this._options);
    return this.cachedClient;
  }
}

export {
  ShimmedStabilityAIClient,
};
