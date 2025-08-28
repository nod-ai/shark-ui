import Attempt from '@/library/Attempt';

import {
  Server as WebAPI_Server,
} from '@/library/WebAPI';

import {
  Config_Dynamic as TextToImage_Config_Dynamic,
  Config_Static as TextToImage_Config_Static,
  TextToImage_Config_empty,
} from '../../Config';

import {
  TextToImage_Server_Error,
} from '../Error';

const TextToImage_Server_Origin_environmentKey = 'VITE__TEXT_TO_IMAGE__API__SERVER__ORIGIN';

const TextToImage_Server_Current_accordingToEnvironment = ((): WebAPI_Server | null => {
  const originAccordingToEnvironment = import.meta.env[TextToImage_Server_Origin_environmentKey];

  if (
    originAccordingToEnvironment === undefined
  ) return null;

  const serverAccordingToEnvironment = WebAPI_Server.from({
    origin: originAccordingToEnvironment,
  });

  return serverAccordingToEnvironment;
})();

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
    TextToImage_Server_Origin_environmentKey,
    TextToImage_Config_Static.file,
    TextToImage_Config_Dynamic.endpoint,
  );

  return ends.inFailureDueTo(newSpecificationError);
});

export {
  TextToImage_Server_Current_accordingToEnvironment as Current_accordingToEnvironment,
  TextToImage_Server_Current_retrieve as Current_retrieve,
  TextToImage_Server_Error as Error,
};
