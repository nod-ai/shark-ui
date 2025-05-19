import {
  Outcome,
} from '@/library/Attempt';
import {
  URLPath,
} from '@/library/customTypes/URLComponent';

import {
  Config,
  ConfigSchema,
} from '../../types';

import StaticConfigReadingError from './StaticConfigReadingError';

const configFile = URLPath.forciblyParsedFrom('/config/text-to-image.json');

type OutcomeOfReadingConfig = Outcome<
  Config,
  StaticConfigReadingError
>;

const readConfig = async (): Promise<OutcomeOfReadingConfig> => {
  const fileResponse = await fetch(configFile.toString());

  if (
    !fileResponse.ok
  ) return Outcome.failureDueTo(new StaticConfigReadingError(configFile, fileResponse));

  const unparsedSchema = await fileResponse.json() as unknown;
  const parsedConfig = ConfigSchema.parse(unparsedSchema);
  return Outcome.successThatYielded(parsedConfig);
};

export {
  configFile as file,
  readConfig as read,
  StaticConfigReadingError as ReadingError,
};
