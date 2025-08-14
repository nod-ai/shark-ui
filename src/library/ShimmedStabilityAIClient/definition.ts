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
} from '@/library/URLComponent';

import toShortfin from './toShortfin';

class Client_Version1_Image
  extends HTTP.Client {
  public async forciblyGenerateFromText(
    givenRequest: GenerateFromTextRequest,
  ): Promise<GenerateFromTextResponse> {
    const derivedBatchedRequestBody = toShortfin.BatchedRequestBody([
      givenRequest.textToImageRequestBody,
    ]);

    const textToImageSDXLShortfinClient = new Shortfin.TextToImage.SDXL.Client(this.origin, this.headers);

    const outcomeOfGeneratingImage = await textToImageSDXLShortfinClient.generateImageFrom(derivedBatchedRequestBody);
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

class Client_Version1
  extends HTTP.Client {
  private cachedClient?: Client_Version1_Image;

  public get image(): Client_Version1_Image {
    this.cachedClient ??= new Client_Version1_Image(this.origin, this.headers);
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

  private cachedClient?: Client_Version1;

  public get version1(): Client_Version1 {
    this.cachedClient ??= new Client_Version1(this.origin, this.headers);
    return this.cachedClient;
  }
}

export {
  ShimmedStabilityAIClient as default,
};
