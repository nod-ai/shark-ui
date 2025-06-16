import Attempt from '@/library/Attempt';

import {
  URLPath,
} from '@/library/customTypes/URLComponent';

import {
  type Config,
  ConfigSchema,
} from '../../types';

import StaticConfigReadingError from './StaticConfigReadingError';

const configFile = URLPath.forciblyParsedFrom('/config/text-to-image.json');

type OutcomeOfReadingConfig = Attempt.Outcome<
  Config,
  StaticConfigReadingError
>;

const readConfig = (): Promise<OutcomeOfReadingConfig> => Attempt.thatEventually(async (ends) => {
  const fileResponse = await fetch(configFile.toString());

  if (
    !fileResponse.ok
  ) return ends.inFailureDueTo(new StaticConfigReadingError(configFile, fileResponse));

  const unparsedSchema = await fileResponse.json() as unknown;
  const parsedConfig = ConfigSchema.parse(unparsedSchema);
  return ends.inSuccessWith(parsedConfig);
});

export {
  configFile as file,
  readConfig as read,
  StaticConfigReadingError as ReadingError,
};
