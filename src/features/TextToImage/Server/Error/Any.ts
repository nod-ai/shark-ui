import type {
  TextToImage_Server_Error_FailedToConnect,
} from './FailedToConnect';

import type {
  TextToImage_Server_Error_MissingSpecification,
} from './MissingSpecification';

type TextToImage_Server_Error_Any =
  | TextToImage_Server_Error_MissingSpecification
  | TextToImage_Server_Error_FailedToConnect
;

export type {
  TextToImage_Server_Error_Any,
};
