import {
  Option,
} from 'effect';

import type {
  GenerateFromTextRequest,
} from 'stabilityai-client-typescript/models/operations';

import type Shortfin from '@/library/Shortfin';

import {
  toShortfinRequestBody_Prompt,
} from './Prompt';

function toShortfinRequestBody(
  givenRequestBody: GenerateFromTextRequest['textToImageRequestBody'],
): Option.Option<Shortfin.TextToImage.SDXL.Client.Request.Body> {
  if (
    (givenRequestBody.height === undefined)
    || (givenRequestBody.width === undefined)
    || (givenRequestBody.steps === undefined)
    || (givenRequestBody.cfgScale === undefined)
    || (givenRequestBody.seed === undefined)
  ) return Option.none();

  const derivedShortfinRequestBody = {
    prompt: toShortfinRequestBody_Prompt(givenRequestBody.textPrompts, {
      weight: 1,
    }),
    neg_prompt: toShortfinRequestBody_Prompt(givenRequestBody.textPrompts, {
      weight: -1,
    }),
    height        : givenRequestBody.height,
    width         : givenRequestBody.width,
    steps         : givenRequestBody.steps,
    guidance_scale: givenRequestBody.cfgScale,
    seed          : givenRequestBody.seed,
  };

  return Option.some(derivedShortfinRequestBody);
}

export {
  toShortfinRequestBody,
};
