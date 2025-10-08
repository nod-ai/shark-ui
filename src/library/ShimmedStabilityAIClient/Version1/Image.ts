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
  toShortfinRequestBody,
} from '../toShortfinRequestBody';

class ShimmedStabilityAIClient_Version1_Image
  extends HTTP.Client {
  public async forciblyGenerateFromText(
    givenRequest: GenerateFromTextRequest,
  ): Promise<GenerateFromTextResponse> {
    const derivedBatchedRequestBody = toShortfinRequestBody.Batched([
      givenRequest.textToImageRequestBody,
    ]);

    const textToImageSDXLShortfinClient = new Shortfin.TextToImage.SDXL.Client(this.origin);

    const outcomeOfGeneratingImage = await textToImageSDXLShortfinClient.generateImageFrom(derivedBatchedRequestBody);
    const generatedImage = outcomeOfGeneratingImage.unwrapOrThrow(/* matches error propagation of actual StabilityAI Client */);

    const soleGeneratedArtifact: StabilityAI_TextToImage_Pipeline_Output = {
      base64      : generatedImage.toString(),
      finishReason: 'SUCCESS',
      seed        : givenRequest.textToImageRequestBody.seed,
    };

    const newStabilityAIGenerationResponse = {
      headers: {},
      result : {
        artifacts: [
          soleGeneratedArtifact,
        ],
      },
    };

    return newStabilityAIGenerationResponse;
  }
}

export {
  ShimmedStabilityAIClient_Version1_Image,
};
