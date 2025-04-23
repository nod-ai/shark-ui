import type {
  TextToImageRequestBody,
} from 'stabilityai-client-typescript/models/components';

export default interface TextToImageInput {
  text: TextToImageRequestBody['textPrompts'];
}
