import {
  URI_Image,
} from './Image';

import {
  URI,
} from './definition.ts';

URI.Image = URI_Image;

declare module './definition.ts' {
  namespace URI {
    export {
      URI_Image as Image,
    };
  }
}
