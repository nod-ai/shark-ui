import Attempt from '@/library/Attempt';

import {
  URLComponent_Path,
} from '@/library/URLComponent';

import {
  Config,
} from '../../types';

import StaticConfigReadingError from './StaticConfigReadingError';

const configFile = URLComponent_Path.parsedFrom('/config/text-to-image.json').forciblyUnwrap();

type OutcomeOfReadingConfig = Attempt.Outcome<
  Config,
  StaticConfigReadingError
>;

const readConfig = (): Promise<OutcomeOfReadingConfig> => Attempt.thatEventually(async (ends) => {
  const fileResponse = await fetch(configFile.toString());

  if (
    !fileResponse.ok
  ) return ends.inFailureDueTo(new StaticConfigReadingError(configFile, fileResponse));

  const rawConfig = await fileResponse.json() as unknown;
  const parsedConfig = Config.parsedFrom(rawConfig).forciblyUnwrap(/* Implementation must align with established contract. */);
  return ends.inSuccessWith(parsedConfig);
});

export {
  configFile as file,
  readConfig as read,
  StaticConfigReadingError as ReadingError,
};
