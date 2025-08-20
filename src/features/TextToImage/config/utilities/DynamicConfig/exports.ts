import Attempt from '@/library/Attempt';

import {
  URLComponent_Path,
} from '@/library/URLComponent';

import {
  Config as TextToImage_Config,
} from '../../types';

import TextToImage_DynamicConfig_EndpointResponseError from './EndpointResponseError';
import TextToImage_DynamicConfig_FetchingError from './FetchingError';

const HTTP_Client_contentIsJSONIn = (givenResponse: Response): boolean => {
  const rawContentDescriptor = givenResponse.headers.get('Content-Type');

  if (
    rawContentDescriptor === null
  ) return false;

  return rawContentDescriptor.includes('application/json');
};

const TextToImage_configEndpoint = URLComponent_Path.parsedFrom('/config/text-to-image').forciblyUnwrap();

type TextToImage_OutcomeOfFetchingConfig = Attempt.Outcome<TextToImage_Config,
  | TextToImage_DynamicConfig_FetchingError
  | TextToImage_DynamicConfig_EndpointResponseError
>;

const TextToImage_fetchConfig = (): Promise<TextToImage_OutcomeOfFetchingConfig> => Attempt.thatEventually(async (ends) => {
  const endpointResponse = await fetch(TextToImage_configEndpoint.toString());
  const fetchingError = new TextToImage_DynamicConfig_FetchingError(TextToImage_configEndpoint);

  if (
    !endpointResponse.ok
  ) return ends.inFailureDueTo(fetchingError);

  const endpointResponseError = new TextToImage_DynamicConfig_EndpointResponseError({
    endpoint: TextToImage_configEndpoint,
    response: endpointResponse,
  });

  if (
    !HTTP_Client_contentIsJSONIn(endpointResponse)
  ) return ends.inFailureDueTo(endpointResponseError);

  const rawConfig = await endpointResponse.json() as unknown;
  const parsedConfig = TextToImage_Config.parsedFrom(rawConfig).forciblyUnwrap(/* Implementation must align with established contract. */);
  return ends.inSuccessWith(parsedConfig);
});

export {
  TextToImage_configEndpoint as endpoint,
  TextToImage_fetchConfig as fetch,
  TextToImage_DynamicConfig_FetchingError as FetchingError,
  TextToImage_DynamicConfig_EndpointResponseError as EndpointResponseError,
};
