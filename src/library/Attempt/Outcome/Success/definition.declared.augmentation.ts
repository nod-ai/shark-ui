import {
  Attempt_Outcome_Success_Product,
} from './Product';

import type {
  Attempt_Outcome_Success_Transformer,
} from './Transformer';

import {
  Attempt_Outcome_Success,
} from './definition.declared.ts';

import {
  Attempt_Outcome_Success_thatYielded,
} from './thatYielded';

Attempt_Outcome_Success.Product/**/ = Attempt_Outcome_Success_Product;
Attempt_Outcome_Success.thatYielded = Attempt_Outcome_Success_thatYielded;

declare module './definition.declared.ts' {
  namespace Attempt_Outcome_Success {
    export {
      /**/ Attempt_Outcome_Success_Product/**/ as Product,
      type Attempt_Outcome_Success_Transformer as Transformer,
      /**/ Attempt_Outcome_Success_thatYielded as thatYielded,
    };
  }
}
