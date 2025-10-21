import {
  FetchHttpClient,
  HttpClient,
  HttpClientResponse,
} from '@effect/platform';

import {
  Effect,
} from 'effect';

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
  const endpointResponse = yield* HttpClient.get(TextToImage_Config_Dynamic_endpoint);
  const decodedBodyFrom = HttpClientResponse.schemaBodyJson(TextToImage_Config);
  const decodedConfigFromEndpoint = yield* decodedBodyFrom(endpointResponse).pipe(Effect.orDie);
  return decodedConfigFromEndpoint;
}).pipe(
  Effect.mapError($0 => new TextToImage_Config_Dynamic_Fetching.Error({
    endpoint: TextToImage_Config_Dynamic_endpoint,
    cause   : $0,
  })),
  Effect.provide(FetchHttpClient.layer),
);

export {
  TextToImage_Config_Dynamic_fetch,
};
