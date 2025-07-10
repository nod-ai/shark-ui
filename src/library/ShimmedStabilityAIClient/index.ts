import type {
  TextToImageRequestBody,
} from 'stabilityai-client-typescript/models/components';

import type {
  GenerateFromTextRequest,
  GenerateFromTextResponse,
} from 'stabilityai-client-typescript/models/operations';

import {
  z,
} from 'zod/v4';

import Base64CharacterEncodedByteSequence from '@/library/Base64CharacterEncodedByteSequence';
import HTTP from '@/library/HTTP';

import {
  URLOrigin,
  URLPath,
} from '@/library/customTypes/URLComponent';

import {
  cloneOf,
} from '@/library/utilitiesByType/reference.ts';

type UnsignedInteger = number;
type FloatingPoint = number;

interface ShortfinSDClient_ImageGenerationBatchRequest_Body {
  prompt: /*        */ string[];
  neg_prompt: /*    */ string[];
  height: /*        */ UnsignedInteger[];
  width: /*         */ UnsignedInteger[];
  steps: /*         */ UnsignedInteger[];
  guidance_scale: /**/ FloatingPoint[];
  seed: /*          */ UnsignedInteger[];
}

type Shortfin_TextToImage_SD_Input_Text_SupportedWeight = 1 | -1;

const toSerializedPromptValue = (
  givenTextPrompts: TextToImageRequestBody['textPrompts'],
  given: {
    weight: Shortfin_TextToImage_SD_Input_Text_SupportedWeight;
  },
): string => {
  return givenTextPrompts
    .filter($0 => $0.weight === given.weight)
    .map($0 => $0.text.trim())
    .join(',');
};

const emptyBatchGenerationRequest: ShortfinSDClient_ImageGenerationBatchRequest_Body = {
  prompt        : [],
  neg_prompt    : [],
  height        : [],
  width         : [],
  steps         : [],
  guidance_scale: [],
  seed          : [],
};

const toBatchGenerationRequestBody = (givenRequests: GenerateFromTextRequest['textToImageRequestBody'][]): ShortfinSDClient_ImageGenerationBatchRequest_Body => {
  return givenRequests.reduce<
    ShortfinSDClient_ImageGenerationBatchRequest_Body
  >((runningBatchRequest, eachRequest) => {
    if (
      (eachRequest.height !== undefined)
      && (eachRequest.width !== undefined)
      && (eachRequest.steps !== undefined)
      && (eachRequest.cfgScale !== undefined)
      && (eachRequest.seed !== undefined)
    ) {
      const positiveTextPrompts = toSerializedPromptValue(eachRequest.textPrompts, {
        weight: 1,
      });

      const negativeTextPrompts = toSerializedPromptValue(eachRequest.textPrompts, {
        weight: -1,
      });

      (runningBatchRequest.prompt/*    */).push(positiveTextPrompts/* */);
      (runningBatchRequest.neg_prompt/**/).push(negativeTextPrompts/* */);
      (runningBatchRequest.height/*    */).push(eachRequest.height/*  */);
      (runningBatchRequest.width/*     */).push(eachRequest.width/*   */);
      (runningBatchRequest.steps/*     */).push(eachRequest.steps/*   */);
      (runningBatchRequest.guidance_scale).push(eachRequest.cfgScale/**/);
      (runningBatchRequest.seed/*      */).push(eachRequest.seed/*    */);
    }

    return runningBatchRequest;
  }, cloneOf(emptyBatchGenerationRequest));
};

const Shortfin_TextToImage_Response_Body = {
  SchemaMember: {
    image: z.string().transform((someSubject) => {
      return Base64CharacterEncodedByteSequence.parsedFrom(someSubject).forciblyUnwrap(/* Zod can safely propagate errors */);
    }),
    get images() {
      return z.tuple([this.image]).rest(this.image);
    },
  },
  get Schema() {
    return z.object({
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
    const outcomeOfSubmittingResource = await this.submitResource({
      bySending: toBatchGenerationRequestBody([
        givenRequest.textToImageRequestBody,
      ]),
      to: generationEndpoint,
    });

    const newResource = outcomeOfSubmittingResource.forciblyUnwrap(/* matches error propagation of actual StabilityAI Client */);

    const {
      images,
    } = Shortfin_TextToImage_Response_Body.Schema.parse(newResource);

    const [soleGeneratedImage] = images;

    return {
      headers: {},
      result : {
        artifacts: [
          {
            base64      : soleGeneratedImage.toString(),
            finishReason: 'SUCCESS',
            seed        : givenRequest.textToImageRequestBody.seed,
          },
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
