import {
  toSharkUIOutput_Image_Description,
} from './Description';

import {
  toSharkUIOutput_Image,
} from './definition.ts';

toSharkUIOutput_Image.Description = toSharkUIOutput_Image_Description;

declare module './definition.ts' {
  namespace toSharkUIOutput_Image {
    export {
      toSharkUIOutput_Image_Description as Description,
    };
  }
}
