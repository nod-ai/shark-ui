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
  TextToImage_Config_Static_Reading.Outcome
> => Attempt.Fresh.thatEventually(async (ends) => {
  const outcomeOfFetchingFile = await HTTP.Client.local.fetchResource({
    from: TextToImage_Config_Static_file,
  });

  return ends.inTermsOf(outcomeOfFetchingFile, {
    product: $0 => TextToImage_Config.parsedFrom($0).forciblyUnwrap(/* Implementation must align with established contract. */),
    cause  : $0 => new TextToImage_Config_Static_Reading.Error(TextToImage_Config_Static_file, $0),
  });
});

export {
  TextToImage_Config_Static_read,
};
