import {
  URLPath,
} from '@/library/customTypes/URLComponent';

import {
  Config,
  ConfigSchema,
} from '../../types';

import StaticConfigReadingError from './StaticConfigReadingError';

const configFile = URLPath.forciblyParsedFrom('/config/text-to-image.json');

const forciblyReadConfig = async (): Promise<Config> => {
  const fileResponse = await fetch(configFile.toString());

  if (
    !fileResponse.ok
  ) return new StaticConfigReadingError(configFile, fileResponse).throwAnyway();

  const unparsedSchema = await fileResponse.json() as unknown;
  return ConfigSchema.parse(unparsedSchema);
};

export {
  configFile as file,
  forciblyReadConfig as forciblyRead,
  StaticConfigReadingError as ReadingError,
};
