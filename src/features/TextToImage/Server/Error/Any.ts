import type {
  default as TextToImage_Server_Error_Connection,
} from './Connection';

import type {
  default as TextToImage_Server_Error_Specification,
} from './Specification';

type TextToImage_Server_Error_Any =
  | TextToImage_Server_Error_Specification
  | TextToImage_Server_Error_Connection
;

export type {
  TextToImage_Server_Error_Any,
};
