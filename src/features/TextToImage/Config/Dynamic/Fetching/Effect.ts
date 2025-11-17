import type {
  Effect,
} from 'effect';

import type {
  TextToImage_Config,
} from '../../definition.declared.ts';

import type {
  TextToImage_Config_Dynamic_Fetching_Error,
} from './Error';

type TextToImage_Config_Dynamic_Fetching_Effect = Effect.Effect<
  TextToImage_Config,
  TextToImage_Config_Dynamic_Fetching_Error
>;

export type {
  TextToImage_Config_Dynamic_Fetching_Effect,
};
