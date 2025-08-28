import {
  toShortfinRequestBody_Batched,
} from './Batched';

import {
  toShortfinRequestBody_Prompt,
} from './Prompt';

import {
  toShortfinRequestBody,
} from './definition.ts';

toShortfinRequestBody.Prompt = toShortfinRequestBody_Prompt;
toShortfinRequestBody.Batched = toShortfinRequestBody_Batched;

declare module './definition.ts' {
  namespace toShortfinRequestBody {
    export {
      toShortfinRequestBody_Prompt as Prompt,
      toShortfinRequestBody_Batched as Batched,
    };
  }
}
