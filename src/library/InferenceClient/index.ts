import {
  z,
} from 'zod';

import HTTPClient from '@/library/HTTPClient/index.ts';

import {
  z_base64CharacterEncodedByteSequence,
} from '@/library/customTypes/Base64CharacterEncodedByteSequence.ts';

import ImageURI from '@/library/customTypes/UniformResourceIdentifier/Data/Image/index.ts';

import type {
  Branded,
} from '@/library/typeUtilities/Branded.ts';

import {
  cloneOf,
} from '@/library/utilitiesByType/reference.ts';

type UnsignedInteger = Branded<number, 'UnsignedInteger'>;
type FloatingPoint = Branded<number, 'FloatingPoint'>;

interface StabilityAIClient_ImageGenerationRequest {
  prompt: /*        */ string;
  neg_prompt: /*    */ string;
  height: /*        */ UnsignedInteger;
  width: /*         */ UnsignedInteger;
  steps: /*         */ UnsignedInteger;
  guidance_scale: /**/ FloatingPoint;
  seed: /*          */ UnsignedInteger;
}

interface ShortfinSDClient_ImageGenerationBatchRequest {
  prompt: /*        */ string[];
  neg_prompt: /*    */ string[];
  height: /*        */ UnsignedInteger[];
  width: /*         */ UnsignedInteger[];
  steps: /*         */ UnsignedInteger[];
  guidance_scale: /**/ FloatingPoint[];
  seed: /*          */ UnsignedInteger[];
};

const emptyBatchGenerationRequest: ShortfinSDClient_ImageGenerationBatchRequest = {
  prompt        : [],
  neg_prompt    : [],
  height        : [],
  width         : [],
  steps         : [],
  guidance_scale: [],
  seed          : [],
};

const toBatchGenerationRequest = (givenRequests: StabilityAIClient_ImageGenerationRequest[]): ShortfinSDClient_ImageGenerationBatchRequest => {
  return givenRequests.reduce<ShortfinSDClient_ImageGenerationBatchRequest>((runningBatchRequest, eachRequest) => {
    (runningBatchRequest.prompt/*    */).push(eachRequest.prompt/*    */);
    (runningBatchRequest.neg_prompt/**/).push(eachRequest.neg_prompt/**/);
    (runningBatchRequest.height/*    */).push(eachRequest.height/*    */);
    (runningBatchRequest.width/*     */).push(eachRequest.width/*     */);
    (runningBatchRequest.steps/*     */).push(eachRequest.steps/*     */);
    (runningBatchRequest.guidance_scale).push(eachRequest.guidance_scale);
    (runningBatchRequest.seed/*      */).push(eachRequest.seed/*      */);

    return runningBatchRequest;
  }, cloneOf(emptyBatchGenerationRequest));
};

const ShortfinTextToImageAPI = {
  server: {
    origin        : import.meta.env.VITE_TEXT_TO_IMAGE_API_ORIGIN,
    generationPath: 'generate',
  },
  get generationEndpoint(): URL {
    const {
      origin,
      generationPath,
    } = this.server;

    return new URL(`${origin}/${generationPath}`);
  },
};

const ShortfinClient = new HTTPClient({
  'Content-Type': 'application/json',
});

const z_image = z_base64CharacterEncodedByteSequence.transform((base64PNGData) => {
  return new ImageURI('png', 'base64', base64PNGData);
});

const z_imageGenerationResponseBody = z.object({
  images: z.tuple([z_image]).rest(z_image),
});

export const tryToGenerateImage = async (
  givenRequest: StabilityAIClient_ImageGenerationRequest,
): Promise<ImageURI> => {
  const newResource = await ShortfinClient.tryToSubmitResource({
    bySending: toBatchGenerationRequest([
      givenRequest,
    ]),
    to: ShortfinTextToImageAPI.generationEndpoint,
  });

  const {
    images,
  } = z_imageGenerationResponseBody.parse(newResource);

  const [soleGeneratedImage] = images;
  return soleGeneratedImage;
};
