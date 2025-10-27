import type {
  TextToImage_Pipeline_Output_Image,
} from './Image';

declare module './definition.declared.ts' {
  namespace TextToImage_Pipeline_Output {
    export {
      type TextToImage_Pipeline_Output_Image as Image,
    };
  }
}
