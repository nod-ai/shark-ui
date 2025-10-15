import {
  Exit,
  Schema,
} from 'effect';

import Attempt from '@/library/Attempt';
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
> => Attempt.Fresh.thatEventually(async () => {
  const exitFromFetchingFile = await HTTP.Client.local.fetchResource({
    from: TextToImage_Config_Static_file,
  });

  return Exit.mapBoth(exitFromFetchingFile, {
    onSuccess: $0 => Schema.decodeUnknownSync(TextToImage_Config)($0),
    onFailure: $0 => new TextToImage_Config_Static_Reading.Error(TextToImage_Config_Static_file, $0),
  });
});

export {
  TextToImage_Config_Static_read,
};
