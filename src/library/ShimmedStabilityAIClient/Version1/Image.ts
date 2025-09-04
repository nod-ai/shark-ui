import type {
  Image as StabilityAI_TextToImage_Pipeline_Output,
} from 'stabilityai-client-typescript/models/components';

import type {
  GenerateFromTextRequest,
  GenerateFromTextResponse,
} from 'stabilityai-client-typescript/models/operations';

import HTTP from '@/library/HTTP';
import Shortfin from '@/library/Shortfin';

import toShortfin from '../toShortfin';

class ShimmedStabilityAIClient_Version1_Image
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
