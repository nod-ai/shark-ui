import {
  Effect,
  Exit,
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

const TextToImage_Config_Static_read = (): Promise<
  TextToImage_Config_Static_Reading.Exit
> => Effect.runPromise(Effect.promise(async () => {
  const exitFromFetchingRawConfigFromFile = await HTTP.Client.local.fetchResource({
    from: TextToImage_Config_Static_file,
  });

  const exitFromDecodingConfigFromFile = exitFromFetchingRawConfigFromFile.pipe(Exit.mapBoth({
    onSuccess: $0 => Schema.decodeUnknownSync(TextToImage_Config)($0),
    onFailure: $0 => new TextToImage_Config_Static_Reading.Error({
      cause   : $0,
      filePath: TextToImage_Config_Static_file,
    }),
  }));

  return exitFromDecodingConfigFromFile;
}));

export {
  TextToImage_Config_Static_read,
};
