import Attempt from '@/library/Attempt';
import HTTP from '@/library/HTTP';

import {
  URLComponent_Path,
} from '@/library/URLComponent';

import type {
  Shortfin_TextToImage_SDXL_Client_Request,
} from './Request';

import {
  Shortfin_TextToImage_SDXL_Client_Response,
} from './Response';

class Shortfin_TextToImage_SDXL_Client
  extends HTTP.Client {
  public generateImageFrom(
    givenBatchedRequestBody: Shortfin_TextToImage_SDXL_Client_Request.Body.Batched,
  ): Promise<Shortfin_TextToImage_SDXL_Client_Request.Outcome> {
    const generationEndpoint = URLComponent_Path.parsedFrom('/generate').forciblyUnwrap();

    return Attempt.thatEventually(async (ends) => {
      const outcomeOfSubmittingResource = await this.submitResource({
        bySending: givenBatchedRequestBody,
        to       : generationEndpoint,
      });

      if (
        outcomeOfSubmittingResource.isFailure
      ) return outcomeOfSubmittingResource;

      const rawResource = outcomeOfSubmittingResource.unwrapped;

      const parsedResource = Shortfin_TextToImage_SDXL_Client_Response.Body.parsedFrom(rawResource)
        .forciblyUnwrap(/* Implementation must align with established contract. */);

      const [soleGeneratedImage] = parsedResource.images;
      return ends.inSuccessWith(soleGeneratedImage);
    });
  }
}

export {
  Shortfin_TextToImage_SDXL_Client,
};
