import Attempt from '@/library/Attempt';
import HTTP from '@/library/HTTP';

import {
  URLComponent_Path,
} from '@/library/URLComponent';

import {
  TextToImage_Config,
} from '../definition.ts';

import {
  TextToImage_Config_Dynamic_Fetching,
} from './Fetching';

import type {
  TextToImage_Config_Dynamic_Fetching_Error,
} from './Fetching/Error';

const TextToImage_Config_Dynamic_endpoint = URLComponent_Path.parsedFrom('/config/text-to-image').forciblyUnwrap();

type TextToImage_Config_Dynamic_Fetching_Outcome = Attempt.Outcome<
  TextToImage_Config,
  TextToImage_Config_Dynamic_Fetching_Error.Any
>;

const TextToImage_Config_Dynamic_fetch = (): Promise<
  TextToImage_Config_Dynamic_Fetching_Outcome
> => Attempt.Fresh_thatEventually(async (ends) => {
  const endpointResponse = await fetch(TextToImage_Config_Dynamic_endpoint.toString());
  const fetchingError = new TextToImage_Config_Dynamic_Fetching.Error.Request(TextToImage_Config_Dynamic_endpoint);

  if (
    !endpointResponse.ok
  ) return ends.inFailureDueTo(fetchingError);

  const endpointResponseError = new TextToImage_Config_Dynamic_Fetching.Error.Response({
    endpoint: TextToImage_Config_Dynamic_endpoint,
    response: endpointResponse,
  });

  if (
    !HTTP.Client.contentIsJSONIn(endpointResponse)
  ) return ends.inFailureDueTo(endpointResponseError);

  const rawConfig = await endpointResponse.json() as unknown;
  const parsedConfig = TextToImage_Config.parsedFrom(rawConfig).forciblyUnwrap(/* Implementation must align with established contract. */);
  return ends.inSuccessWith(parsedConfig);
});

export {
  TextToImage_Config_Dynamic_endpoint as endpoint,
  TextToImage_Config_Dynamic_fetch as fetch,
  TextToImage_Config_Dynamic_Fetching as Fetching,
};
