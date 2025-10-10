import type Attempt from '@/library/Attempt';

import type {
  TextToImage_Pipeline,
} from '../../Pipeline';

import type {
  TextToImage_Server,
} from '../../Server';

type TextToImage_Client_Generation_Outcome = Attempt.Outcome<
  TextToImage_Pipeline.Output,
  TextToImage_Server.Error.Any
>;

export type {
  TextToImage_Client_Generation_Outcome,
};
