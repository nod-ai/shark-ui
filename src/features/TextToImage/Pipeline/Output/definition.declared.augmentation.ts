import type {
  TextToImage_Pipeline_Output_Image,
} from './Image';

import {
  TextToImage_Pipeline_Output_Option,
} from './Option';

import {
  TextToImage_Pipeline_Output,
} from './definition.declared.ts';

TextToImage_Pipeline_Output.Option = TextToImage_Pipeline_Output_Option;

declare module './definition.declared.ts' {
  namespace TextToImage_Pipeline_Output {
    export {
      /**/ TextToImage_Pipeline_Output_Option /**/ as Option,
      type TextToImage_Pipeline_Output_Image /* */ as Image,
    };
  }
}
