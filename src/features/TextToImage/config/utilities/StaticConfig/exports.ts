import Attempt from '@/library/Attempt';

import {
  URLComponent_Path,
} from '@/library/URLComponent';

import {
  Config as TextToImage_Config,
} from '../../types';

import TextToImage_StaticConfigReadingError from './StaticConfigReadingError';

const TextToImage_configFile = URLComponent_Path.parsedFrom('/config/text-to-image.json').forciblyUnwrap();

type TextToImage_OutcomeOfReadingConfig = Attempt.Outcome<
  TextToImage_Config,
  TextToImage_StaticConfigReadingError
>;

const TextToImage_readConfig = (): Promise<TextToImage_OutcomeOfReadingConfig> => Attempt.thatEventually(async (ends) => {
  const fileResponse = await fetch(TextToImage_configFile.toString());

  if (
    !fileResponse.ok
  ) return ends.inFailureDueTo(new TextToImage_StaticConfigReadingError(TextToImage_configFile, fileResponse));

  const rawConfig = await fileResponse.json() as unknown;
  const parsedConfig = TextToImage_Config.parsedFrom(rawConfig).forciblyUnwrap(/* Implementation must align with established contract. */);
  return ends.inSuccessWith(parsedConfig);
});

export {
  TextToImage_configFile as file,
  TextToImage_readConfig as read,
  TextToImage_StaticConfigReadingError as ReadingError,
};
