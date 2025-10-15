import {
  Effect,
  Exit,
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

const TextToImage_Server_Current_retrieve = (): Promise<
  Exit.Exit<
    WebAPI.Server,
    TextToImage_Server_Error.MissingSpecification
  >
> => Effect.runPromise(Effect.promise(async () => {
  if (
    Option.isSome(TextToImage_Server_Current_accordingToEnvironment)
  ) return Exit.succeed(Option.getOrThrow(TextToImage_Server_Current_accordingToEnvironment));

  const exitFromReadingStaticConfig = await TextToImage_Config.Static.read();
  const staticConfig = Effect.runSync(Effect.orElseSucceed(exitFromReadingStaticConfig, () => TextToImage_Config.empty));

  if (
    Option.isSome(staticConfig.server)
  ) return Exit.succeed(Option.getOrThrow(staticConfig.server));

  const exitFromFetchingDynamicConfig = await TextToImage_Config.Dynamic.fetch();
  const dynamicConfig = Effect.runSync(Effect.orElseSucceed(exitFromFetchingDynamicConfig, () => TextToImage_Config.empty));

  if (
    Option.isSome(dynamicConfig.server)
  ) return Exit.succeed(Option.getOrThrow(dynamicConfig.server));

  const newSpecificationError = new TextToImage_Server_Error.MissingSpecification(
    TextToImage_Server_Origin.environmentKey,
    TextToImage_Config.Static.file,
    TextToImage_Config.Dynamic.endpoint,
  );

  return Exit.fail(newSpecificationError);
}));

export {
  TextToImage_Server_Current_retrieve,
};
