import {
  Schema,
} from 'effect';

import Attempt from '@/library/Attempt';
import ContentDescriptor from '@/library/ContentDescriptor';
import HTTP from '@/library/HTTP';
import URLComponent from '@/library/URLComponent';

import type {
  Shortfin_TextToImage_SDXL_Client_Request,
} from './Request';

import {
  Shortfin_TextToImage_SDXL_Client_Response,
} from './Response';

class Shortfin_TextToImage_SDXL_Client
  extends HTTP.Client {
  public constructor(
    givenOrigin: URLComponent.Origin,
  ) {
    const defaultHeaders = {
      [HTTP.Header.Content.Descriptor]: ContentDescriptor.json.serialized.toString(),
    };

    super(
      givenOrigin,
      defaultHeaders,
    );
  }

  public generateImageFrom(
    givenBatchedRequestBody: Shortfin_TextToImage_SDXL_Client_Request.Body.Batched,
  ): Promise<
    Shortfin_TextToImage_SDXL_Client_Request.Exit
  > {
    const generationEndpoint = URLComponent.Path('/generate');

    return Attempt.Fresh.thatEventually(async () => {
      const outcomeOfSubmittingResource = await this.submitResource({
        bySending: givenBatchedRequestBody,
        to       : generationEndpoint,
      });

      if (
        Attempt.Exit.isFailure(outcomeOfSubmittingResource)
      ) return outcomeOfSubmittingResource;

      const rawResource = outcomeOfSubmittingResource.value;
      const decodedResource = Schema.decodeUnknownSync(Shortfin_TextToImage_SDXL_Client_Response.Body)(rawResource);
      const [soleGeneratedImage] = decodedResource.images;
      return Attempt.Exit.succeed(soleGeneratedImage);
    });
  }
}

export {
  Shortfin_TextToImage_SDXL_Client,
};
