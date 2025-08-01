import type {
  Image as StabilityAI_TextToImage_Pipeline_Output,
} from 'stabilityai-client-typescript/models/components';

import type {
  GenerateFromTextRequest,
  GenerateFromTextResponse,
} from 'stabilityai-client-typescript/models/operations';

import Attempt from '@/library/Attempt';
import HTTP from '@/library/HTTP';
import Shortfin from '@/library/Shortfin';

import {
  URLOrigin,
  URLPath,
} from '@/library/URLComponent';

import toShortfin from './toShortfin';

class ImageClient
  extends HTTP.Client {
  public async forciblyGenerateFromText(
    givenRequest: GenerateFromTextRequest,
  ): Promise<GenerateFromTextResponse> {
    const derivedBatchedRequestBody = toShortfin.BatchedRequestBody([
      givenRequest.textToImageRequestBody,
    ]);

    const generateImageFrom = async function (
      this: HTTP.Client,
      givenBatchedRequestBody: Shortfin.TextToImage.SDXL.Client.Request.Body.Batched,
    ): Promise<Shortfin.TextToImage.SDXL.Client.Request.Outcome> {
      const generationEndpoint = URLPath.parsedFrom('/generate').forciblyUnwrap();

      return Attempt.thatEventually(async (ends) => {
        const outcomeOfSubmittingResource = await this.submitResource({
          bySending: givenBatchedRequestBody,
          to       : generationEndpoint,
        });

        if (
          outcomeOfSubmittingResource.isFailure
        ) return outcomeOfSubmittingResource;

        const rawResource = outcomeOfSubmittingResource.unwrapped;

        const parsedResource = Shortfin.TextToImage.SDXL.Client.Response.Body.parsedFrom(rawResource)
          .forciblyUnwrap(/* Implementation must align with established contract. */);

        const [soleGeneratedImage] = parsedResource.images;
        return ends.inSuccessWith(soleGeneratedImage);
      });
    };

    const textToImageSDXLShortfinClient_generateImageFrom = generateImageFrom.bind(this);

    const outcomeOfGeneratingImage = await textToImageSDXLShortfinClient_generateImageFrom(derivedBatchedRequestBody);
    const generatedImage = outcomeOfGeneratingImage.forciblyUnwrap(/* matches error propagation of actual StabilityAI Client */);

    const soleGeneratedArtifact: StabilityAI_TextToImage_Pipeline_Output = {
      base64      : generatedImage.toString(),
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
