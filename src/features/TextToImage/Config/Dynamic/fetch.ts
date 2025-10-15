import {
  Effect,
  Exit,
  Schema,
} from 'effect';

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
  TextToImage_Config_Dynamic_Fetching.Exit
> => Effect.runPromise(Effect.promise(async () => {
  const exitFromFetchingResource = await HTTP.Client.local.fetchResource({
    from: TextToImage_Config_Dynamic_endpoint,
  });

  return Exit.mapBoth(exitFromFetchingResource, {
    onSuccess: $0 => Schema.decodeUnknownSync(TextToImage_Config)($0),
    onFailure: $0 => new TextToImage_Config_Dynamic_Fetching.Error(TextToImage_Config_Dynamic_endpoint, $0),
  });
}));

export {
  TextToImage_Config_Dynamic_fetch,
};
