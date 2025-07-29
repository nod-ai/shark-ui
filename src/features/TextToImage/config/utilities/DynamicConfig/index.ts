import Attempt from '@/library/Attempt';

import {
  URLPath,
} from '@/library/URLComponent/exports';

import {
  type Config,
  ConfigSchema,
} from '../../types/exports';

import DynamicConfig_EndpointResponseError from './EndpointResponseError';
import DynamicConfig_FetchingError from './FetchingError';

const contentIsJSONIn = (givenResponse: Response): boolean => {
  const contentType = givenResponse.headers.get('Content-Type');

  if (
    contentType === null
  ) return false;

  return contentType.includes('application/json');
};

const configEndpoint = URLPath.parsedFrom('/config/text-to-image').forciblyUnwrap();

type OutcomeOfFetchingConfig = Attempt.Outcome<Config,
  | DynamicConfig_FetchingError
  | DynamicConfig_EndpointResponseError
>;

const fetchConfig = (): Promise<OutcomeOfFetchingConfig> => Attempt.thatEventually(async (ends) => {
  const endpointResponse = await fetch(configEndpoint.toString());
  const fetchingError = new DynamicConfig_FetchingError(configEndpoint);

  if (
    !endpointResponse.ok
  ) return ends.inFailureDueTo(fetchingError);

  const endpointResponseError = new DynamicConfig_EndpointResponseError({
    endpoint: configEndpoint,
    response: endpointResponse,
  });

  if (
    !contentIsJSONIn(endpointResponse)
  ) return ends.inFailureDueTo(endpointResponseError);

  const unparsedSchema = await endpointResponse.json() as unknown;
  const fetchedConfig = ConfigSchema.parse(unparsedSchema);
  return ends.inSuccessWith(fetchedConfig);
});

export {
  configEndpoint as endpoint,
  fetchConfig as fetch,
  DynamicConfig_FetchingError as FetchingError,
  DynamicConfig_EndpointResponseError as EndpointResponseError,
};
