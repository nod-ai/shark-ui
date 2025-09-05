import {
  Attempt_Outcome_Success_Product,
} from './Product';

import {
  Attempt_Outcome_Success,
} from './definition.ts';

Attempt_Outcome_Success.Product = Attempt_Outcome_Success_Product;

declare module './definition.ts' {
  namespace Attempt_Outcome_Success {
    export {
      Attempt_Outcome_Success_Product as Product,
    };
  }
}
