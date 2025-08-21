import Attempt from '@/library/Attempt';

import {
  URLComponent_Path,
} from '@/library/URLComponent';

import {
  Config as TextToImage_Config,
} from '../../types';

import TextToImage_Config_Static_ReadingError from './StaticConfigReadingError';

const TextToImage_Config_Static_file = URLComponent_Path.parsedFrom('/config/text-to-image.json').forciblyUnwrap();

type TextToImage_Config_Static_OutcomeOfReading = Attempt.Outcome<
  TextToImage_Config,
  TextToImage_Config_Static_ReadingError
>;

const TextToImage_Config_Static_read = (): Promise<TextToImage_Config_Static_OutcomeOfReading> => Attempt.thatEventually(async (ends) => {
  const fileResponse = await fetch(TextToImage_Config_Static_file.toString());

  if (
    !fileResponse.ok
  ) return ends.inFailureDueTo(new TextToImage_Config_Static_ReadingError(TextToImage_Config_Static_file, fileResponse));

  const rawConfig = await fileResponse.json() as unknown;
  const parsedConfig = TextToImage_Config.parsedFrom(rawConfig).forciblyUnwrap(/* Implementation must align with established contract. */);
  return ends.inSuccessWith(parsedConfig);
});

export {
  TextToImage_Config_Static_file as file,
  TextToImage_Config_Static_read as read,
  TextToImage_Config_Static_ReadingError as ReadingError,
};
