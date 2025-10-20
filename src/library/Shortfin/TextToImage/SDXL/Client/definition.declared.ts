import {
  Effect,
  Exit,
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
  ): Promise<
    Shortfin_TextToImage_SDXL_Client_Request.Exit
  > => Effect.runPromise(Effect.promise(async () => {
    const exitFromSubmittingResource = await this.submitResource({
      bySending: givenBatchedRequestBody,
      to       : URLComponent.Path('/generate'),
    });

    if (
      Exit.isFailure(exitFromSubmittingResource)
    ) return Exit.failCause(exitFromSubmittingResource.cause);

    const rawResource = exitFromSubmittingResource.value;
    const decodedResource = Schema.decodeUnknownSync(Shortfin_TextToImage_SDXL_Client_Response.Body)(rawResource);
    const [soleGeneratedImage] = decodedResource.images;
    return Exit.succeed(soleGeneratedImage);
  }));
}

export {
  Shortfin_TextToImage_SDXL_Client,
};
