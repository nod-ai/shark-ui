import type {
  Range_BoundContainment,
} from './BoundContainment';

import {
  Range_Discrete,
} from './Discrete';

import {
  Range,
} from './definition.ts';

Range.Discrete = Range_Discrete;

declare module './definition.ts' {
  namespace Range {
    export {
      type Range_BoundContainment as BoundContainment,
      /**/ Range_Discrete /*   */ as Discrete,
    };
  }
}
