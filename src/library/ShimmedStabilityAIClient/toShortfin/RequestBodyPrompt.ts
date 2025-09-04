import type {
  TextToImageRequestBody,
} from 'stabilityai-client-typescript/models/components';

import type Shortfin from '@/library/Shortfin';

const toShortfin_RequestBodyPrompt = (
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
  toShortfin_RequestBodyPrompt,
};
