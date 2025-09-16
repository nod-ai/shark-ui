import {
  TextToImage_Pipeline_Output_Nullable,
} from './Nullable';

import {
  TextToImage_Pipeline_Output,
} from './definition.declared.ts';

TextToImage_Pipeline_Output.Nullable = TextToImage_Pipeline_Output_Nullable;

declare module './definition.declared.ts' {
  namespace TextToImage_Pipeline_Output {
    export {
      TextToImage_Pipeline_Output_Nullable as Nullable,
    };
  }
}
