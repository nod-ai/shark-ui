import HTTP from '@/library/HTTP';
import URLComponent from '@/library/URLComponent';

import {
  ShimmedStabilityAIClient_Version1,
} from './Version1';

class ShimmedStabilityAIClient
  extends HTTP.Client {
  public constructor(given: {
    serverURL: string;
  }) {
    const serverOrigin = URLComponent.Origin(given.serverURL);

    super(
      serverOrigin,
    );
  }

  private cachedClient?: ShimmedStabilityAIClient_Version1;

  public get version1(): ShimmedStabilityAIClient_Version1 {
    this.cachedClient ??= new ShimmedStabilityAIClient_Version1(this.origin);
    return this.cachedClient;
  }
}

export {
  ShimmedStabilityAIClient,
};
