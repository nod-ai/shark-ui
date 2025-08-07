import type {
  Image as StabilityAI_TextToImage_Pipeline_Output,
} from 'stabilityai-client-typescript/models/components';

import type {
  GenerateFromTextRequest,
  GenerateFromTextResponse,
} from 'stabilityai-client-typescript/models/operations';

import Base64CharacterEncodedByteSequence from '@/library/Base64CharacterEncodedByteSequence';
import HTTP from '@/library/HTTP';
import Schema from '@/library/Schema';
import Shortfin from '@/library/Shortfin';

import {
  URLOrigin,
  URLPath,
} from '@/library/URLComponent';

import {
  toShortfinRequestBodyPrompt,
} from './conversions';

const toShortfinBatchedRequestBody = (
  givenRequestBodies: GenerateFromTextRequest['textToImageRequestBody'][],
): Shortfin.TextToImage.SDXL.Client.Request.Body.Batched => {
  const emptyBatchedRequestBody = new Shortfin.TextToImage.SDXL.Client.Request.Body.Batched();

  return givenRequestBodies.reduce((runningBatchedRequestBody, eachStabilityAIRequestBody) => {
    (() => {
      if (
        (eachStabilityAIRequestBody.height !== undefined)
        && (eachStabilityAIRequestBody.width !== undefined)
        && (eachStabilityAIRequestBody.steps !== undefined)
        && (eachStabilityAIRequestBody.cfgScale !== undefined)
        && (eachStabilityAIRequestBody.seed !== undefined)
      ) {
        const eachShortfinRequestBody = {
          prompt: toShortfinRequestBodyPrompt(eachStabilityAIRequestBody.textPrompts, {
            weight: 1,
          }),
          neg_prompt: toShortfinRequestBodyPrompt(eachStabilityAIRequestBody.textPrompts, {
            weight: -1,
          }),
          height        : eachStabilityAIRequestBody.height,
          width         : eachStabilityAIRequestBody.width,
          steps         : eachStabilityAIRequestBody.steps,
          guidance_scale: eachStabilityAIRequestBody.cfgScale,
          seed          : eachStabilityAIRequestBody.seed,
        };

        (runningBatchedRequestBody.prompt/*    */).push(eachShortfinRequestBody.prompt/*    */);
        (runningBatchedRequestBody.neg_prompt/**/).push(eachShortfinRequestBody.neg_prompt/**/);
        (runningBatchedRequestBody.height/*    */).push(eachShortfinRequestBody.height/*    */);
        (runningBatchedRequestBody.width/*     */).push(eachShortfinRequestBody.width/*     */);
        (runningBatchedRequestBody.steps/*     */).push(eachShortfinRequestBody.steps/*     */);
        (runningBatchedRequestBody.guidance_scale).push(eachShortfinRequestBody.guidance_scale);
        (runningBatchedRequestBody.seed/*      */).push(eachShortfinRequestBody.seed/*      */);
      }
    })();

    return runningBatchedRequestBody;
  }, emptyBatchedRequestBody);
};

const Shortfin_TextToImage_SDXL_Client_Response_Body = {
  SchemaMember: {
    image: Schema.string().transform((someSubject) => {
      return Base64CharacterEncodedByteSequence.parsedFrom(someSubject).forciblyUnwrap(/* Zod can safely propagate errors */);
    }),
    get images() {
      return Schema.tuple([this.image]).rest(this.image);
    },
  },
  get Schema() {
    return Schema.object({
      images: this.SchemaMember.images,
    });
  },
};

const generationEndpoint = URLPath.parsedFrom('/generate').forciblyUnwrap();

class ImageClient
  extends HTTP.Client {
  public async forciblyGenerateFromText(
    givenRequest: GenerateFromTextRequest,
  ): Promise<GenerateFromTextResponse> {
    const derivedBatchedRequestBody = toShortfinBatchedRequestBody([
      givenRequest.textToImageRequestBody,
    ]);

    const outcomeOfSubmittingResource = await this.submitResource({
      bySending: derivedBatchedRequestBody,
      to       : generationEndpoint,
    });

    const newResource = outcomeOfSubmittingResource.forciblyUnwrap(/* matches error propagation of actual StabilityAI Client */);
    const parsedResource = Shortfin_TextToImage_SDXL_Client_Response_Body.Schema.parse(newResource);
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
