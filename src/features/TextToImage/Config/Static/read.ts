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
  TextToImage_Config_Static_Reading,
} from './Reading';

import {
  TextToImage_Config_Static_file,
} from './file';

const TextToImage_Config_Static_read: TextToImage_Config_Static_Reading.Effect = Effect.gen(function* () {
  const fileResponse = yield* HttpClient.get(TextToImage_Config_Static_file);
  const decodedBodyFrom = HttpClientResponse.schemaBodyJson(TextToImage_Config);
  const decodedConfigFromFile = yield* decodedBodyFrom(fileResponse).pipe(Effect.orDie);
  return decodedConfigFromFile;
}).pipe(
  Effect.mapError($0 => new TextToImage_Config_Static_Reading.Error({
    filePath: TextToImage_Config_Static_file,
    cause   : $0,
  })),
  Effect.provide(FetchHttpClient.layer),
);

export {
  TextToImage_Config_Static_read,
};
