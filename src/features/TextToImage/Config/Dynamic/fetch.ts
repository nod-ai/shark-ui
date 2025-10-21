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

const TextToImage_Config_Dynamic_fetch: TextToImage_Config_Dynamic_Fetching.Effect = Effect.gen(function* () {
  const rawConfigFromEndpoint = yield* HTTP.Client.local.fetchResource({
    from: TextToImage_Config_Dynamic_endpoint,
  });

  const decodedConfigFromEndpoint = Schema.decodeUnknownSync(TextToImage_Config)(rawConfigFromEndpoint);
  return decodedConfigFromEndpoint;
}).pipe(
  Effect.mapError($0 => new TextToImage_Config_Dynamic_Fetching.Error({
    endpoint: TextToImage_Config_Dynamic_endpoint,
    cause   : $0,
  })),
);

export {
  TextToImage_Config_Dynamic_fetch,
};
