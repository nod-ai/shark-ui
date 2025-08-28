import type {
  TextToImageRequestBody,
} from 'stabilityai-client-typescript/models/components';

import type Shortfin from '@/library/Shortfin';

const toShortfinRequestBody_Prompt = (
  givenTextPrompts: TextToImageRequestBody['textPrompts'],
  given: {
    weight: Shortfin.TextToImage.SDXL.Pipeline.Input.Text.SupportedWeight;
  },
): Shortfin.TextToImage.SDXL.Client.Request.Body['prompt'] => {
  return givenTextPrompts
    .filter($0 => $0.weight === given.weight)
    .map($0 => $0.text.trim())
    .join(',');
};

export {
  toShortfinRequestBody_Prompt,
};
