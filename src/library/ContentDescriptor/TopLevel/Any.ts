import type {
  ContentDescriptor_TopLevel_Composite,
} from './Composite';

import type {
  ContentDescriptor_TopLevel_Discrete,
} from './Discrete';

type ContentDescriptor_TopLevel_Any =
  | ContentDescriptor_TopLevel_Composite.Any
  | ContentDescriptor_TopLevel_Discrete.Any
  ;

export type {
  ContentDescriptor_TopLevel_Any,
};
