import {
  Data,
} from 'effect';

import type {
  TextToImage_Pipeline_Output_Image,
} from './Image';

/** The resulting information after a text-to-image model has ingested some input with some configuration */
class TextToImage_Pipeline_Output
  extends Data.Class<{
    image: TextToImage_Pipeline_Output_Image;
  }> {}

export {
  TextToImage_Pipeline_Output,
};
