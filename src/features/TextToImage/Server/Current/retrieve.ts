import {
  Effect,
  Option,
} from 'effect';

import type WebAPI from '@/library/WebAPI';

import {
  TextToImage_Config,
} from '../../Config';

import {
  TextToImage_Server_Error,
} from '../Error';

import {
  TextToImage_Server_Origin,
} from '../Origin';

import {
  TextToImage_Server_Current_accordingToEnvironment,
} from './accordingToEnvironment';

const TextToImage_Server_Current_retrieve = (): Effect.Effect<
  WebAPI.Server,
  TextToImage_Server_Error.MissingSpecification
> => Effect.gen(function* () {
  if (
    Option.isSome(TextToImage_Server_Current_accordingToEnvironment)
  ) return TextToImage_Server_Current_accordingToEnvironment.value;

  const remoteConfig = yield* Effect.firstSuccessOf([
    TextToImage_Config.Static.read(),
    TextToImage_Config.Dynamic.fetch,
  ]).pipe(
    Effect.orElseSucceed(() => TextToImage_Config.empty),
  );

  const currentTextToImageServer = yield* remoteConfig.server.pipe(
    Effect.orElse(() => new TextToImage_Server_Error.MissingSpecification({
      environmentKey: TextToImage_Server_Origin.environmentKey,
      file          : TextToImage_Config.Static.file,
      endpoint      : TextToImage_Config.Dynamic.endpoint,
    })),
  );

  return currentTextToImageServer;
});

export {
  TextToImage_Server_Current_retrieve,
};
