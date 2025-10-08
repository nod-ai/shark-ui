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
  Attempt.Outcome<
    WebAPI.Server,
    TextToImage_Server_Error.MissingSpecification
  >
> => Attempt.Fresh.thatEventually(async (ends) => {
  if (
    Option.isSome(TextToImage_Server_Current_accordingToEnvironment)
  ) return ends.inSuccessWith(Option.getOrThrow(TextToImage_Server_Current_accordingToEnvironment));

  const staticConfig = (await TextToImage_Config.Static.read()).unwrapOr(TextToImage_Config.empty);

  if (
    Option.isSome(staticConfig.server)
  ) return ends.inSuccessWith(Option.getOrThrow(staticConfig.server));

  const dynamicConfig = (await TextToImage_Config.Dynamic.fetch()).unwrapOr(TextToImage_Config.empty);

  if (
    Option.isSome(dynamicConfig.server)
  ) return ends.inSuccessWith(Option.getOrThrow(dynamicConfig.server));

  const newSpecificationError = new TextToImage_Server_Error.MissingSpecification(
    TextToImage_Server_Origin.environmentKey,
    TextToImage_Config.Static.file,
    TextToImage_Config.Dynamic.endpoint,
  );

  return ends.inFailureDueTo(newSpecificationError);
});

export {
  TextToImage_Server_Current_retrieve,
};
