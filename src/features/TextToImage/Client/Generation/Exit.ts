import type {
  Exit,
} from 'effect';

import type {
  TextToImage_Pipeline,
} from '../../Pipeline';

import type {
  TextToImage_Server,
} from '../../Server';

type TextToImage_Client_Generation_Exit = Exit.Exit<
  TextToImage_Pipeline.Output,
  TextToImage_Server.Error.Any
>;

export type {
  TextToImage_Client_Generation_Exit,
};
