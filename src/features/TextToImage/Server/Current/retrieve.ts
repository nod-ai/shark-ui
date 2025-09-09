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
    TextToImage_Server_Error.Specification
  >
> => Attempt.Fresh.thatEventually(async (ends) => {
  if (
    TextToImage_Server_Current_accordingToEnvironment !== null
  ) return ends.inSuccessWith(TextToImage_Server_Current_accordingToEnvironment);

  const staticConfig = (await TextToImage_Config.Static.read()).optionallyUnwrap() ?? TextToImage_Config.empty;

  if (
    staticConfig.server !== null
  ) return ends.inSuccessWith(staticConfig.server);

  const dynamicConfig = (await TextToImage_Config.Dynamic.fetch()).optionallyUnwrap() ?? TextToImage_Config.empty;

  if (
    dynamicConfig.server !== null
  ) return ends.inSuccessWith(dynamicConfig.server);

  const newSpecificationError = new TextToImage_Server_Error.Specification(
    TextToImage_Server_Origin.environmentKey,
    TextToImage_Config.Static.file,
    TextToImage_Config.Dynamic.endpoint,
  );

  return ends.inFailureDueTo(newSpecificationError);
});

export {
  TextToImage_Server_Current_retrieve,
};
