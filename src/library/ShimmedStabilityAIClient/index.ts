import type {
  TextToImageRequestBody,
} from 'stabilityai-client-typescript/models/components';
import type {
  GenerateFromTextRequest,
  GenerateFromTextResponse,
} from 'stabilityai-client-typescript/models/operations';

import {
  z,
} from 'zod';

import HTTPClient from '@/library/HTTPClient/index.ts';

import Base64CharacterEncodedByteSequence from '@/library/customTypes/Base64CharacterEncodedByteSequence.ts';

import {
  URLOrigin,
  URLPath,
} from '@/library/customTypes/URLComponent';

import {
  cloneOf,
} from '@/library/utilitiesByType/reference.ts';

import type ImageGenerationPrompt from '@/models/ImageGenerationPrompt.ts';

import ImageGenerationPromptWeight, {
  quantitative,
} from '@/models/ImageGenerationPromptWeight.ts';

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
};

const toSerializedPromptValue = (
  givenTextPrompts: TextToImageRequestBody['textPrompts'],
  givenWeight: ImageGenerationPromptWeight,
): ImageGenerationPrompt['positive' | 'negative'] => {
  return givenTextPrompts
    .filter($0 => $0.weight === quantitative(givenWeight))
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
      const {
        positive,
        negative,
      } = ImageGenerationPromptWeight;

      const positiveTextPrompts = toSerializedPromptValue(eachRequest.textPrompts, positive);
      const negativeTextPrompts = toSerializedPromptValue(eachRequest.textPrompts, negative);

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

const z_image = z.string().transform((someSubject) => {
  return Base64CharacterEncodedByteSequence.tryToParseFrom(someSubject);
});

const z_imageGenerationResponseBody = z.object({
  images: z.tuple([z_image]).rest(z_image),
});

class ImageClient extends HTTPClient {
  public async tryToGenerateFromText(
    givenRequest: GenerateFromTextRequest,
  ): Promise<GenerateFromTextResponse> {
    const newResource = await this.tryToSubmitResource({
      bySending: toBatchGenerationRequestBody([
        givenRequest.textToImageRequestBody,
      ]),
      to: URLPath.tryToParseFrom('/generate'),
    });

    const {
      images,
    } = z_imageGenerationResponseBody.parse(newResource);

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

class Version1Client extends HTTPClient {
  private _image?: ImageClient;

  public get image(): ImageClient {
    this._image ??= new ImageClient(this);
    return this._image;
  }
}

export default class ShimmedStabilityAIClient extends HTTPClient {
  public constructor(given: {
    serverURL: string;
  }) {
    super({
      origin : URLOrigin.tryToParseFrom(given.serverURL),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  private _version1?: Version1Client;

  public get version1(): Version1Client {
    this._version1 ??= new Version1Client(this);
    return this._version1;
  }
}
