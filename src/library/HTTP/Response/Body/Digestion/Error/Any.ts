import type {
  HTTP_Response_Body_Digestion_Error_DescriptorMismatch,
} from './DescriptorMismatch';

import type {
  HTTP_Response_Body_Digestion_Error_InvalidJSONSyntax,
} from './InvalidJSONSyntax';

type HTTP_Response_Body_Digestion_Error_Any =
  | HTTP_Response_Body_Digestion_Error_DescriptorMismatch
  | HTTP_Response_Body_Digestion_Error_InvalidJSONSyntax
;

export type {
  HTTP_Response_Body_Digestion_Error_Any,
};
