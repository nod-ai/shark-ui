import type {
  Effect,
} from 'effect';

import type {
  TextToImage_Config,
} from '../../definition.declared.ts';

import type {
  TextToImage_Config_Static_Reading_Error,
} from './Error';

type TextToImage_Config_Static_Reading_Effect = Effect.Effect<
  TextToImage_Config,
  TextToImage_Config_Static_Reading_Error
>;

export type {
  TextToImage_Config_Static_Reading_Effect,
};
