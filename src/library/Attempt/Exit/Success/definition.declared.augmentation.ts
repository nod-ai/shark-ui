import {
  Attempt_Exit_Success_Product,
} from './Product';

import {
  Attempt_Exit_Success,
} from './definition.declared.ts';

import {
  Attempt_Exit_Success_thatYielded,
} from './thatYielded';

Attempt_Exit_Success.Product/**/ = Attempt_Exit_Success_Product;
Attempt_Exit_Success.thatYielded = Attempt_Exit_Success_thatYielded;

declare module './definition.declared.ts' {
  namespace Attempt_Exit_Success {
    export {
      /**/ Attempt_Exit_Success_Product/**/ as Product,
      /**/ Attempt_Exit_Success_thatYielded as thatYielded,
    };
  }
}
