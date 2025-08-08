import type {
  GenerateFromTextRequest,
} from 'stabilityai-client-typescript/models/operations';

import type Shortfin from '@/library/Shortfin';

import {
  toShortfin_RequestBodyPrompt,
} from './toShortfinRequestBodyPrompt';

const toShortfin_RequestBody = (
  givenRequestBody: GenerateFromTextRequest['textToImageRequestBody'],
): Shortfin.TextToImage.SDXL.Client.Request.Body | null => {
  if (
    (givenRequestBody.height === undefined)
    || (givenRequestBody.width === undefined)
    || (givenRequestBody.steps === undefined)
    || (givenRequestBody.cfgScale === undefined)
    || (givenRequestBody.seed === undefined)
  ) return null;

  const derivedShortfinRequestBody = {
    prompt: toShortfin_RequestBodyPrompt(givenRequestBody.textPrompts, {
      weight: 1,
    }),
    neg_prompt: toShortfin_RequestBodyPrompt(givenRequestBody.textPrompts, {
      weight: -1,
    }),
    height        : givenRequestBody.height,
    width         : givenRequestBody.width,
    steps         : givenRequestBody.steps,
    guidance_scale: givenRequestBody.cfgScale,
    seed          : givenRequestBody.seed,
  };

  return derivedShortfinRequestBody;
};

export {
  toShortfin_RequestBody,
};
