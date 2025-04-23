import type {
  TextToImageRequestBody,
} from 'stabilityai-client-typescript/models/components';

/** The information that's eventually ingested by some text-to-image model */
export interface TextToImageInput {
  text: TextToImageRequestBody['textPrompts'];
}
