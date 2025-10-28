import {
  TextToImage_Pipeline_Output_Image,
} from './Image';

import {
  TextToImage_Pipeline_Output,
} from './definition.declared.ts';

TextToImage_Pipeline_Output.Image = TextToImage_Pipeline_Output_Image;

declare module './definition.declared.ts' {
  namespace TextToImage_Pipeline_Output {
    export {
      /**/ TextToImage_Pipeline_Output_Image as Image,
    };
  }
}
