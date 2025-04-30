import {
  URLPath,
} from '@/library/customTypes/URLComponent';

import {
  Config,
  ConfigSchema,
} from '../types';

const configFile = URLPath.tryToParseFrom('/config/text-to-image.json');

const tryToReadConfig = async (): Promise<Config> => {
  const fileResponse = await fetch(configFile.toString());

  if (
    !fileResponse.ok
  ) throw new Error(`Failed to read config: ${fileResponse.statusText}`);

  const unparsedSchema = await fileResponse.json() as unknown;
  return ConfigSchema.parse(unparsedSchema);
};

export {
  configFile as file,
  tryToReadConfig as tryToRead,
};
