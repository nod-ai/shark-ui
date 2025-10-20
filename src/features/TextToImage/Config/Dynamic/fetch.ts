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
  const exitFromFetchingRawConfigFromEndpoint = (await HTTP.Client.local.fetchResource({
    from: TextToImage_Config_Dynamic_endpoint,
  })).pipe(
    Exit.mapError($0 => new TextToImage_Config_Dynamic_Fetching.Error({
      endpoint: TextToImage_Config_Dynamic_endpoint,
      cause   : $0,
    })),
  );

  const exitFromDecodingConfigFromEndpoint = exitFromFetchingRawConfigFromEndpoint.pipe(
    Exit.map($0 => Schema.decodeUnknownSync(TextToImage_Config)($0)),
  );

  return exitFromDecodingConfigFromEndpoint;
}));

export {
  TextToImage_Config_Dynamic_fetch,
};
