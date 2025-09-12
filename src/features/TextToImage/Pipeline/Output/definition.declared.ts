import type {
  TextToImage_Pipeline_Output_Image,
} from './Image';

import {
  TextToImage_Pipeline_Output_Nullable,
} from './Nullable';

/** The resulting information after a text-to-image model has ingested some input with some configuration */
interface TextToImage_Pipeline_Output {
  image: TextToImage_Pipeline_Output_Image;
}

const TextToImage_Pipeline_Output = {
  Nullable: TextToImage_Pipeline_Output_Nullable,
};

export {
  TextToImage_Pipeline_Output,
};
