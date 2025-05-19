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

import DynamicConfig_EndpointResponseError from './EndpointResponseError';
import DynamicConfig_FetchingError from './FetchingError';

const contentIsJSONIn = (givenResponse: Response): boolean => {
  const contentType = givenResponse.headers.get('Content-Type');

  if (contentType === null) return false;

  return contentType.includes('application/json');
};

const configEndpoint = URLPath.forciblyParsedFrom('/config/text-to-image');

type OutcomeOfFetchingConfig = Outcome<Config,
  | DynamicConfig_FetchingError
  | DynamicConfig_EndpointResponseError
>;

const fetchConfig = async (): Promise<OutcomeOfFetchingConfig> => {
  const endpointResponse = await fetch(configEndpoint.toString());
  const fetchingError = new DynamicConfig_FetchingError(configEndpoint);

  if (
    !endpointResponse.ok
  ) return Outcome.failureDueTo(fetchingError);

  const endpointResponseError = new DynamicConfig_EndpointResponseError({
    endpoint: configEndpoint,
    response: endpointResponse,
  });

  if (
    !contentIsJSONIn(endpointResponse)
  ) return Outcome.failureDueTo(endpointResponseError);

  const unparsedSchema = await endpointResponse.json() as unknown;
  const fetchedConfig = ConfigSchema.parse(unparsedSchema);
  return Outcome.successThatYielded(fetchedConfig);
};

export {
  configEndpoint as endpoint,
  fetchConfig as fetch,
  DynamicConfig_FetchingError as FetchingError,
  DynamicConfig_EndpointResponseError as EndpointResponseError,
};
