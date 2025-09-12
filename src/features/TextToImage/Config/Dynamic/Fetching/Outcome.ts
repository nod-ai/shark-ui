import type Attempt from '@/library/Attempt';

import type {
  TextToImage_Config,
} from '../../definition.declared.ts';

import type {
  TextToImage_Config_Dynamic_Fetching_Error,
} from './Error';

type TextToImage_Config_Dynamic_Fetching_Outcome = Attempt.Outcome<
  TextToImage_Config,
  TextToImage_Config_Dynamic_Fetching_Error.Any
>;

export type {
  TextToImage_Config_Dynamic_Fetching_Outcome,
};
