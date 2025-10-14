import {
  Option,
} from 'effect';

import Attempt from '@/library/Attempt';
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
  Attempt.Exit.Exit<
    WebAPI.Server,
    TextToImage_Server_Error.MissingSpecification
  >
> => Attempt.Fresh.thatEventually(async () => {
  if (
    Option.isSome(TextToImage_Server_Current_accordingToEnvironment)
  ) return Attempt.Exit.succeed(Option.getOrThrow(TextToImage_Server_Current_accordingToEnvironment));

  const staticConfig = Attempt.Either.getOrElse(await TextToImage_Config.Static.read(), () => TextToImage_Config.empty);

  if (
    Option.isSome(staticConfig.server)
  ) return Attempt.Exit.succeed(Option.getOrThrow(staticConfig.server));

  const dynamicConfig = Attempt.Either.getOrElse(await TextToImage_Config.Dynamic.fetch(), () => TextToImage_Config.empty);

  if (
    Option.isSome(dynamicConfig.server)
  ) return Attempt.Exit.succeed(Option.getOrThrow(dynamicConfig.server));

  const newSpecificationError = new TextToImage_Server_Error.MissingSpecification(
    TextToImage_Server_Origin.environmentKey,
    TextToImage_Config.Static.file,
    TextToImage_Config.Dynamic.endpoint,
  );

  return Attempt.Exit.failCause(newSpecificationError);
});

export {
  TextToImage_Server_Current_retrieve,
};
