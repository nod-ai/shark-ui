import {
  Effect,
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

const TextToImage_Config_Dynamic_fetch: TextToImage_Config_Dynamic_Fetching.Effect = Effect.suspend(() => {
  const effectOfFetchingRawConfigFromEndpoint = HTTP.Client.local.fetchResource({
    from: TextToImage_Config_Dynamic_endpoint,
  }).pipe(
    Effect.mapError($0 => new TextToImage_Config_Dynamic_Fetching.Error({
      endpoint: TextToImage_Config_Dynamic_endpoint,
      cause   : $0,
    })),
  );

  const effectOfDecodingConfigFromEndpoint = effectOfFetchingRawConfigFromEndpoint.pipe(
    Effect.map($0 => Schema.decodeUnknownSync(TextToImage_Config)($0)),
  );

  return effectOfDecodingConfigFromEndpoint;
});

export {
  TextToImage_Config_Dynamic_fetch,
};
