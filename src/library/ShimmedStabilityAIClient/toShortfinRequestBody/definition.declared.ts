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
  return Option.gen(function* () {
    const remainderOfShortfinRequestBody = yield* Option.all({
      height        : Option.fromNullable(givenRequestBody.height /*  */),
      width         : Option.fromNullable(givenRequestBody.width /*   */),
      steps         : Option.fromNullable(givenRequestBody.steps /*   */),
      guidance_scale: Option.fromNullable(givenRequestBody.cfgScale /**/),
      seed          : Option.fromNullable(givenRequestBody.seed /*    */),
    });

    const promptsForShortfinRequestBody = {
      prompt: toShortfinRequestBody_Prompt(givenRequestBody.textPrompts, {
        weight: 1,
      }),
      neg_prompt: toShortfinRequestBody_Prompt(givenRequestBody.textPrompts, {
        weight: -1,
      }),
    };

    const derivedShortfinRequestBody = {
      ...promptsForShortfinRequestBody,
      ...remainderOfShortfinRequestBody,
    };

    return derivedShortfinRequestBody;
  });
}

export {
  toShortfinRequestBody,
};
