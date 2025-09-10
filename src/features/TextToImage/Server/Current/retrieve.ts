import Attempt from '@/library/Attempt';

import type {
  Server as WebAPI_Server,
} from '@/library/WebAPI';

import {
  Dynamic as TextToImage_Config_Dynamic,
  Static as TextToImage_Config_Static,
  TextToImage_Config_empty,
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
    WebAPI_Server,
    TextToImage_Server_Error.Specification
  >
> => Attempt.Fresh_thatEventually(async (ends) => {
  if (
    TextToImage_Server_Current_accordingToEnvironment !== null
  ) return ends.inSuccessWith(TextToImage_Server_Current_accordingToEnvironment);

  const staticConfig = (await TextToImage_Config_Static.read()).optionallyUnwrap() ?? TextToImage_Config_empty;

  if (
    staticConfig.server !== null
  ) return ends.inSuccessWith(staticConfig.server);

  const dynamicConfig = (await TextToImage_Config_Dynamic.fetch()).optionallyUnwrap() ?? TextToImage_Config_empty;

  if (
    dynamicConfig.server !== null
  ) return ends.inSuccessWith(dynamicConfig.server);

  const newSpecificationError = new TextToImage_Server_Error.Specification(
    TextToImage_Server_Origin.environmentKey,
    TextToImage_Config_Static.file,
    TextToImage_Config_Dynamic.endpoint,
  );

  return ends.inFailureDueTo(newSpecificationError);
});

export {
  TextToImage_Server_Current_retrieve,
};
