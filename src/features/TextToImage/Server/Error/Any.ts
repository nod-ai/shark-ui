import type {
  TextToImage_Server_Error_FailedToConnect,
} from './FailedToConnect';

import type {
  TextToImage_Server_Error_Specification,
} from './Specification';

type TextToImage_Server_Error_Any =
  | TextToImage_Server_Error_Specification
  | TextToImage_Server_Error_FailedToConnect
;

export type {
  TextToImage_Server_Error_Any,
};
