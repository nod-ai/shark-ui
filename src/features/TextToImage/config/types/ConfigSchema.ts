import {
  z,
} from 'zod';

import * as WebAPI from '@/library/WebAPI';

import {
  TextToImage_Config,
} from './Config';

/** Defines how to parse an instance of {@link TextToImage_Config} */
const TextToImage_ConfigSchema = z.object({
  server: WebAPI.ServerSchema
    .or(z.null())
    .catch(null),
}).transform($0 => new TextToImage_Config(
  $0.server,
));

export {
  TextToImage_ConfigSchema,
};
