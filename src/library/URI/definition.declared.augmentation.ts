import {
  URI_Data,
} from './Data';

import {
  URI_Image,
} from './Image';

import {
  URI,
} from './definition.declared.ts';

URI.Data = URI_Data;
URI.Image = URI_Image;

declare module './definition.declared.ts' {
  namespace URI {
    export {
      URI_Data as Data,
      URI_Image as Image,
    };
  }
}
