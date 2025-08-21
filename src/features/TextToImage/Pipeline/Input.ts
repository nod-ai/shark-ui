import type {
  TextToImageRequestBody,
} from 'stabilityai-client-typescript/models/components';

/** The information that's eventually ingested by some text-to-image model */
interface TextToImage_Pipeline_Input {
  text: TextToImageRequestBody['textPrompts'];
}

export type {
  TextToImage_Pipeline_Input,
};
