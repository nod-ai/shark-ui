import {
  URI_Image_Format,
} from './Format';

import {
  URI_Image,
} from './definition.ts';

URI_Image.Format = URI_Image_Format;

declare module './definition.ts' {
  namespace URI_Image {
    export {
      URI_Image_Format as Format,
    };
  }
}
