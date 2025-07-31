import Schema from '@/library/Schema';
import * as WebAPI from '@/library/WebAPI';

import {
  TextToImage_Config,
} from './Config';

/** Defines how to parse an instance of {@link TextToImage_Config} */
const TextToImage_ConfigSchema = Schema.object({
  server: WebAPI.ServerSchema
    .nullable()
    .catch(null),
}).transform($0 => new TextToImage_Config(
  $0.server,
));

export {
  TextToImage_ConfigSchema,
};
