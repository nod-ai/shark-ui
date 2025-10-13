import {
  Option,
} from 'effect';

import type {
  TextToImage_Config,
} from './definition.declared.ts';

const TextToImage_Config_empty: TextToImage_Config = {
  server: Option.none(),
};

export {
  TextToImage_Config_empty,
};
