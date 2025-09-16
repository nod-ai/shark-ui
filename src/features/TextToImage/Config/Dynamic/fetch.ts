import Attempt from '@/library/Attempt';
import HTTP from '@/library/HTTP';

import {
  TextToImage_Config,
} from '../definition.declared.ts';

import {
  TextToImage_Config_Dynamic_Fetching,
} from './Fetching';

import {
  TextToImage_Config_Dynamic_endpoint,
} from './endpoint';

const TextToImage_Config_Dynamic_fetch = (): Promise<
  TextToImage_Config_Dynamic_Fetching.Outcome
> => Attempt.Fresh.thatEventually(async (ends) => {
  const endpointResponse = await fetch(TextToImage_Config_Dynamic_endpoint.toString());

  if (!endpointResponse.ok) {
    const fetchingError = new TextToImage_Config_Dynamic_Fetching.Error.Request(TextToImage_Config_Dynamic_endpoint);
    return ends.inFailureDueTo(fetchingError);
  }

  if (!HTTP.Client.contentIsJSONIn(endpointResponse)) {
    const endpointResponseError = new TextToImage_Config_Dynamic_Fetching.Error.Response({
      endpoint: TextToImage_Config_Dynamic_endpoint,
      response: endpointResponse,
    });

    return ends.inFailureDueTo(endpointResponseError);
  }

  const rawConfig = await endpointResponse.json() as unknown;
  const parsedConfig = TextToImage_Config.parsedFrom(rawConfig).forciblyUnwrap(/* Implementation must align with established contract. */);
  return ends.inSuccessWith(parsedConfig);
});

export {
  TextToImage_Config_Dynamic_fetch,
};
