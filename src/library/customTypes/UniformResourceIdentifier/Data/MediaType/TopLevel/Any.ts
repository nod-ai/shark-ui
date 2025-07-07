import type {
  MediaType_TopLevel_Composite,
} from './Composite';

import type {
  MediaType_TopLevel_Discrete,
} from './Discrete';

type MediaType_TopLevel_Any =
  | MediaType_TopLevel_Composite.Any
  | MediaType_TopLevel_Discrete.Any
;

export type {
  MediaType_TopLevel_Any,
};
