import HTTP from '@/library/HTTP';

import {
  URLOrigin,
} from '@/library/URLComponent';

import {
  ShimmedStabilityAIClient_Version1_Image,
} from './Version1/Image';

class ShimmedStabilityAIClient_Version1
  extends HTTP.Client {
  private cachedClient?: ShimmedStabilityAIClient_Version1_Image;

  public get image(): ShimmedStabilityAIClient_Version1_Image {
    this.cachedClient ??= new ShimmedStabilityAIClient_Version1_Image(this.origin, this.headers);
    return this.cachedClient;
  }
}

class ShimmedStabilityAIClient
  extends HTTP.Client {
  public constructor(given: {
    serverURL: string;
  }) {
    const serverOrigin = URLOrigin.parsedFrom(given.serverURL).forciblyUnwrap(/* matches error propagation of actual StabilityAI client */);

    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    super(
      serverOrigin,
      defaultHeaders,
    );
  }

  private cachedClient?: ShimmedStabilityAIClient_Version1;

  public get version1(): ShimmedStabilityAIClient_Version1 {
    this.cachedClient ??= new ShimmedStabilityAIClient_Version1(this.origin, this.headers);
    return this.cachedClient;
  }
}

export {
  ShimmedStabilityAIClient as default,
};
