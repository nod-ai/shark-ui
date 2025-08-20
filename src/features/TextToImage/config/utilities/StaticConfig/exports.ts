import Attempt from '@/library/Attempt';

import {
  URLComponent_Path,
} from '@/library/URLComponent';

import {
  Config as TextToImage_Config,
} from '../../types';

import TextToImage_Config_StaticReadingError from './StaticConfigReadingError';

const TextToImage_Config_file = URLComponent_Path.parsedFrom('/config/text-to-image.json').forciblyUnwrap();

type TextToImage_Config_OutcomeOfReading = Attempt.Outcome<
  TextToImage_Config,
  TextToImage_Config_StaticReadingError
>;

const TextToImage_Config_read = (): Promise<TextToImage_Config_OutcomeOfReading> => Attempt.thatEventually(async (ends) => {
  const fileResponse = await fetch(TextToImage_Config_file.toString());

  if (
    !fileResponse.ok
  ) return ends.inFailureDueTo(new TextToImage_Config_StaticReadingError(TextToImage_Config_file, fileResponse));

  const rawConfig = await fileResponse.json() as unknown;
  const parsedConfig = TextToImage_Config.parsedFrom(rawConfig).forciblyUnwrap(/* Implementation must align with established contract. */);
  return ends.inSuccessWith(parsedConfig);
});

export {
  TextToImage_Config_file as file,
  TextToImage_Config_read as read,
  TextToImage_Config_StaticReadingError as ReadingError,
};
