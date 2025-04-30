import {
  URLPath,
} from '@/library/customTypes/URLComponent';

import {
  Config,
  ConfigSchema,
} from '../types';

const contentIsJSONIn = (givenResponse: Response): boolean => {
  const contentType = givenResponse.headers.get('Content-Type');

  if (contentType === null) return false;

  return contentType.includes('application/json');
};

const configEndpoint = URLPath.tryToParseFrom('/config/text-to-image');

const tryToFetchConfig = async (): Promise<Config> => {
  const endpointResponse = await fetch(configEndpoint.toString());

  if (
    !endpointResponse.ok
  ) throw new Error('Dynamic config: failed to fetch config from endpoint');

  if (
    !contentIsJSONIn(endpointResponse)
  ) throw new Error('Dynamic config: expected JSON response but received non-JSON content.');

  const unparsedSchema = await endpointResponse.json() as unknown;
  return ConfigSchema.parse(unparsedSchema);
};

export {
  configEndpoint as endpoint,
  tryToFetchConfig as tryToFetch,
};
