import {
  URLPath,
} from '@/library/customTypes/URLComponent';

import {
  Config,
  ConfigSchema,
} from '../../types';

import DynamicConfig_EndpointResponseError from './EndpointResponseError';
import DynamicConfig_FetchingError from './FetchingError';

const contentIsJSONIn = (givenResponse: Response): boolean => {
  const contentType = givenResponse.headers.get('Content-Type');

  if (contentType === null) return false;

  return contentType.includes('application/json');
};

const configEndpoint = URLPath.forciblyParsedFrom('/config/text-to-image');

const forciblyFetchConfig = async (): Promise<Config> => {
  const endpointResponse = await fetch(configEndpoint.toString());

  if (
    !endpointResponse.ok
  ) return new DynamicConfig_FetchingError(configEndpoint).throwAnyway();

  if (
    !contentIsJSONIn(endpointResponse)
  ) return new DynamicConfig_EndpointResponseError({
    endpoint: configEndpoint,
    response: endpointResponse,
  }).throwAnyway();

  const unparsedSchema = await endpointResponse.json() as unknown;
  return ConfigSchema.parse(unparsedSchema);
};

export {
  configEndpoint as endpoint,
  forciblyFetchConfig as forciblyFetch,
  DynamicConfig_FetchingError as FetchingError,
  DynamicConfig_EndpointResponseError as EndpointResponseError,
};
