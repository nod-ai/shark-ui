import {
  URI_Data_EncodingIdentifier,
} from './EncodingIdentifier';

import {
  URI_Data,
} from './definition.declared.ts';

URI_Data.EncodingIdentifier = URI_Data_EncodingIdentifier;

declare module './definition.declared.ts' {
  namespace URI_Data {
    export {
      URI_Data_EncodingIdentifier as EncodingIdentifier,
    };
  }
}
