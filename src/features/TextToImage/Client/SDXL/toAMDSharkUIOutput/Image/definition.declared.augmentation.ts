import {
  toAMDSharkUIOutput_Image_Description,
} from './Description';

import {
  toAMDSharkUIOutput_Image,
} from './definition.declared.ts';

toAMDSharkUIOutput_Image.Description = toAMDSharkUIOutput_Image_Description;

declare module './definition.declared.ts' {
  namespace toAMDSharkUIOutput_Image {
    export {
      toAMDSharkUIOutput_Image_Description as Description,
    };
  }
}
