import {
  URI_Data_EncodingIdentifier,
} from './EncodingIdentifier';

import {
  URI_Data,
} from './definition.ts';

URI_Data.EncodingIdentifier = URI_Data_EncodingIdentifier;

declare module './definition.ts' {
  namespace URI_Data {
    export {
      URI_Data_EncodingIdentifier as EncodingIdentifier,
    };
  }
}
