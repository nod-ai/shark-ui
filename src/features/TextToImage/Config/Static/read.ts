import {
  Effect,
  Schema,
} from 'effect';

import HTTP from '@/library/HTTP';

import {
  TextToImage_Config,
} from '../definition.declared.ts';

import {
  TextToImage_Config_Static_Reading,
} from './Reading';

import {
  TextToImage_Config_Static_file,
} from './file';

const TextToImage_Config_Static_read: TextToImage_Config_Static_Reading.Effect = Effect.gen(function* () {
  const rawConfigFromFile = yield* HTTP.Client.local.fetchResource({
    from: TextToImage_Config_Static_file,
  });

  const decodedConfigFromFile = Schema.decodeUnknownSync(TextToImage_Config)(rawConfigFromFile);
  return decodedConfigFromFile;
}).pipe(
  Effect.mapError($0 => new TextToImage_Config_Static_Reading.Error({
    filePath: TextToImage_Config_Static_file,
    cause   : $0,
  })),
);

export {
  TextToImage_Config_Static_read,
};
