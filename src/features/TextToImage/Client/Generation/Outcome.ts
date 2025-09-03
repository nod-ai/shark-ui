import type Attempt from '@/library/Attempt';

import type {
  Output as TextToImage_Pipeline_Output,
} from '../../Pipeline';

import type * as TextToImage_Server from '../../Server';

type TextToImage_Client_Generation_Outcome = Attempt.Outcome<
  TextToImage_Pipeline_Output,
  TextToImage_Server.Error.Any
>;

export type {
  TextToImage_Client_Generation_Outcome,
};
