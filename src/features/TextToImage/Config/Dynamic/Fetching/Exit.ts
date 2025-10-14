import type Attempt from '@/library/Attempt';

import type {
  TextToImage_Config,
} from '../../definition.declared.ts';

import type {
  TextToImage_Config_Dynamic_Fetching_Error,
} from './Error';

type TextToImage_Config_Dynamic_Fetching_Exit = Attempt.Exit<
  TextToImage_Config,
  TextToImage_Config_Dynamic_Fetching_Error
>;

export type {
  TextToImage_Config_Dynamic_Fetching_Exit,
};
