import {
  Effect,
  Schema,
} from 'effect';

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
      [HTTP.Header.Content.Descriptor]: ContentDescriptor.json.serialized,
    };

    super(
      givenOrigin,
      defaultHeaders,
    );
  }

  public generateImageFrom = (
    givenBatchedRequestBody: Shortfin_TextToImage_SDXL_Client_Request.Body.Batched,
  ): Shortfin_TextToImage_SDXL_Client_Request.Effect => Effect.gen(this, function* () {
    const rawResource = yield* this.submitResource({
      bySending: givenBatchedRequestBody,
      to       : URLComponent.Path('/generate'),
    });

    const decodedResource = Schema.decodeUnknownSync(Shortfin_TextToImage_SDXL_Client_Response.Body)(rawResource);
    const [soleGeneratedImage] = decodedResource.images;
    return soleGeneratedImage;
  });
}

export {
  Shortfin_TextToImage_SDXL_Client,
};
