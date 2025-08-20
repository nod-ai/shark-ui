import Attempt from '@/library/Attempt';

import {
  URLComponent_Path,
} from '@/library/URLComponent';

import {
  Config as TextToImage_Config,
} from '../../types';

import TextToImage_Config_Dynamic_EndpointResponseError from './EndpointResponseError';
import TextToImage_Config_Dynamic_FetchingError from './FetchingError';

const HTTP_Client_contentIsJSONIn = (givenResponse: Response): boolean => {
  const rawContentDescriptor = givenResponse.headers.get('Content-Type');

  if (
    rawContentDescriptor === null
  ) return false;

  return rawContentDescriptor.includes('application/json');
};

const TextToImage_Config_endpoint = URLComponent_Path.parsedFrom('/config/text-to-image').forciblyUnwrap();

type TextToImage_Config_OutcomeOfFetching = Attempt.Outcome<TextToImage_Config,
  | TextToImage_Config_Dynamic_FetchingError
  | TextToImage_Config_Dynamic_EndpointResponseError
>;

const TextToImage_Config_fetch = (): Promise<TextToImage_Config_OutcomeOfFetching> => Attempt.thatEventually(async (ends) => {
  const endpointResponse = await fetch(TextToImage_Config_endpoint.toString());
  const fetchingError = new TextToImage_Config_Dynamic_FetchingError(TextToImage_Config_endpoint);

  if (
    !endpointResponse.ok
  ) return ends.inFailureDueTo(fetchingError);

  const endpointResponseError = new TextToImage_Config_Dynamic_EndpointResponseError({
    endpoint: TextToImage_Config_endpoint,
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
  TextToImage_Config_endpoint as endpoint,
  TextToImage_Config_fetch as fetch,
  TextToImage_Config_Dynamic_FetchingError as FetchingError,
  TextToImage_Config_Dynamic_EndpointResponseError as EndpointResponseError,
};
