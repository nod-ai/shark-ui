import type {
  Image as StabilityAI_TextToImage_Pipeline_Output,
} from 'stabilityai-client-typescript/models/components';

import type {
  GenerateFromTextRequest,
  GenerateFromTextResponse,
} from 'stabilityai-client-typescript/models/operations';

import HTTP from '@/library/HTTP';
import Shortfin from '@/library/Shortfin';

import {
  URLOrigin,
  URLPath,
} from '@/library/URLComponent';

import toShortfin from './toShortfin';

const generationEndpoint = URLPath.parsedFrom('/generate').forciblyUnwrap();

class ImageClient
  extends HTTP.Client {
  public async forciblyGenerateFromText(
    givenRequest: GenerateFromTextRequest,
  ): Promise<GenerateFromTextResponse> {
    const derivedBatchedRequestBody = toShortfin.BatchedRequestBody([
      givenRequest.textToImageRequestBody,
    ]);

    const outcomeOfSubmittingResource = await this.submitResource({
      bySending: derivedBatchedRequestBody,
      to       : generationEndpoint,
    });

    const rawResource = outcomeOfSubmittingResource.forciblyUnwrap(/* matches error propagation of actual StabilityAI Client */);
    const parsedResource = Shortfin.TextToImage.SDXL.Client.Response.Body.Schema.parse(rawResource); // Will raw `throw` upon failure. Implementation must align with established contract.
    const [soleGeneratedImage] = parsedResource.images;

    const soleGeneratedArtifact: StabilityAI_TextToImage_Pipeline_Output = {
      base64      : soleGeneratedImage.toString(),
      finishReason: 'SUCCESS',
      seed        : givenRequest.textToImageRequestBody.seed,
    };

    return {
      headers: {},
      result : {
        artifacts: [
          soleGeneratedArtifact,
        ],
      },
    };
  }
}

class Version1Client
  extends HTTP.Client {
  private cachedClient?: ImageClient;

  public get image(): ImageClient {
    this.cachedClient ??= new ImageClient(this.origin, this.headers);
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

  private cachedClient?: Version1Client;

  public get version1(): Version1Client {
    this.cachedClient ??= new Version1Client(this.origin, this.headers);
    return this.cachedClient;
  }
}

export {
  ShimmedStabilityAIClient as default,
};
