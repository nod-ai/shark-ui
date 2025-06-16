import type TextToImage_Output_Image from './Image';

/** The resulting information after a text-to-image model has ingested some input with some configuration */
interface TextToImage_Output {
  image: TextToImage_Output_Image;
}

export type {
  TextToImage_Output,
};
