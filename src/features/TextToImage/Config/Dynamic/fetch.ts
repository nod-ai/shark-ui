import {
  Schema,
} from 'effect';

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
> => Attempt.Fresh.thatEventually(async () => {
  const outcomeOfFetchingResource = await HTTP.Client.local.fetchResource({
    from: TextToImage_Config_Dynamic_endpoint,
  });

  return Attempt.Outcome.mapBoth(outcomeOfFetchingResource, {
    onSuccess: $0 => Schema.decodeUnknownSync(TextToImage_Config)($0),
    onFailure: $0 => new TextToImage_Config_Dynamic_Fetching.Error(TextToImage_Config_Dynamic_endpoint, $0),
  });
});

export {
  TextToImage_Config_Dynamic_fetch,
};
