import Attempt from '@/library/Attempt';

import {
  URLComponent_Path,
} from '@/library/URLComponent';

import {
  Config,
} from '../../types';

import DynamicConfig_EndpointResponseError from './EndpointResponseError';
import DynamicConfig_FetchingError from './FetchingError';

const contentIsJSONIn = (givenResponse: Response): boolean => {
  const rawContentDescriptor = givenResponse.headers.get('Content-Type');

  if (
    rawContentDescriptor === null
  ) return false;

  return rawContentDescriptor.includes('application/json');
};

const configEndpoint = URLComponent_Path.parsedFrom('/config/text-to-image').forciblyUnwrap();

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

  const rawConfig = await endpointResponse.json() as unknown;
  const parsedConfig = Config.parsedFrom(rawConfig).forciblyUnwrap(/* Implementation must align with established contract. */);
  return ends.inSuccessWith(parsedConfig);
});

export {
  configEndpoint as endpoint,
  fetchConfig as fetch,
  DynamicConfig_FetchingError as FetchingError,
  DynamicConfig_EndpointResponseError as EndpointResponseError,
};
