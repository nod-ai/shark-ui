import {
  FetchHttpClient,
  HttpBody,
  HttpClient,
  HttpClientResponse,
} from '@effect/platform';

import {
  Effect,
} from 'effect';

import type URLComponent from '@/library/URLComponent';

import type {
  Shortfin_TextToImage_SDXL_Client_Request,
} from './Request';

import {
  Shortfin_TextToImage_SDXL_Client_Response,
} from './Response';

class Shortfin_TextToImage_SDXL_Client {
  public constructor(
    public readonly origin: URLComponent.Origin,
  ) {}

  public generateImageFrom = (
    givenBatchedRequestBody: Shortfin_TextToImage_SDXL_Client_Request.Body.Batched,
  ): Shortfin_TextToImage_SDXL_Client_Request.Effect => Effect.gen(this, function* () {
    const encodedBatchedRequestBody = yield* HttpBody.json(givenBatchedRequestBody).pipe(Effect.orDie);

    const generationResponse = yield* HttpClient.post(this.origin.concat('/generate'), {
      body: encodedBatchedRequestBody,
    });

    const decodedBodyFrom = HttpClientResponse.schemaBodyJson(Shortfin_TextToImage_SDXL_Client_Response.Body);
    const decodedResource = yield* decodedBodyFrom(generationResponse).pipe(Effect.orDie);
    const [soleGeneratedImage] = decodedResource.images;
    return soleGeneratedImage;
  }).pipe(
    Effect.provide(FetchHttpClient.layer),
  );
}

export {
  Shortfin_TextToImage_SDXL_Client,
};
