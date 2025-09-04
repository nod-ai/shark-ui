import Attempt from '@/library/Attempt';

import {
  TextToImage_Config,
} from '../definition.ts';

import {
  TextToImage_Config_Static_Reading,
} from './Reading';

import {
  TextToImage_Config_Static_file,
} from './file';

const TextToImage_Config_Static_read = (): Promise<
  TextToImage_Config_Static_Reading.Outcome
> => Attempt.Fresh_thatEventually(async (ends) => {
  const fileResponse = await fetch(TextToImage_Config_Static_file.toString());

  if (
    !fileResponse.ok
  ) return ends.inFailureDueTo(new TextToImage_Config_Static_Reading.Error(TextToImage_Config_Static_file, fileResponse));

  const rawConfig = await fileResponse.json() as unknown;
  const parsedConfig = TextToImage_Config.parsedFrom(rawConfig).forciblyUnwrap(/* Implementation must align with established contract. */);
  return ends.inSuccessWith(parsedConfig);
});

export {
  TextToImage_Config_Static_read as read,
};
