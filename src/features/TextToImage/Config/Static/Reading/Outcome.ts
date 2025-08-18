import type Attempt from '@/library/Attempt';

import type {
  TextToImage_Config,
} from '../../definition.ts';

import type {
  default as TextToImage_Config_Static_Reading_Error,
} from './Error';

type TextToImage_Config_Static_Reading_Outcome = Attempt.Outcome<
  TextToImage_Config,
  TextToImage_Config_Static_Reading_Error
>;

export type {
  TextToImage_Config_Static_Reading_Outcome,
};
