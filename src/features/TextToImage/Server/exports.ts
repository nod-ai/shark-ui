import Attempt from '@/library/Attempt';

import {
  Server as WebAPI_Server,
} from '@/library/WebAPI';

import {
  Config_Dynamic as TextToImage_Config_Dynamic,
  Config_Static as TextToImage_Config_Static,
  TextToImage_Config_empty,
} from '../config';

import TextToImage_Server_SpecificationError from './ServerSpecificationError';

const TextToImage_environmentKeyForOriginOfServer = 'VITE__TEXT_TO_IMAGE__API__SERVER__ORIGIN';

const TextToImage_serverAccordingToEnvironment = ((): WebAPI_Server | null => {
  const originAccordingToEnvironment = import.meta.env[TextToImage_environmentKeyForOriginOfServer];

  if (
    originAccordingToEnvironment === undefined
  ) return null;

  return WebAPI_Server.from({
    origin: originAccordingToEnvironment,
  });
})();

const TextToImage_retrieveCurrentServer = (): Promise<
  Attempt.Outcome<WebAPI_Server, TextToImage_Server_SpecificationError>
> => Attempt.thatEventually(async (ends) => {
  if (
    TextToImage_serverAccordingToEnvironment !== null
  ) return ends.inSuccessWith(TextToImage_serverAccordingToEnvironment);

  const staticConfig = (await TextToImage_Config_Static.read()).optionallyUnwrap() ?? TextToImage_Config_empty;

  if (
    staticConfig.server !== null
  ) return ends.inSuccessWith(staticConfig.server);

  const dynamicConfig = (await TextToImage_Config_Dynamic.fetch()).optionallyUnwrap() ?? TextToImage_Config_empty;

  if (
    dynamicConfig.server !== null
  ) return ends.inSuccessWith(dynamicConfig.server);

  const newSpecificationError = new TextToImage_Server_SpecificationError(
    TextToImage_environmentKeyForOriginOfServer,
    TextToImage_Config_Static.file,
    TextToImage_Config_Dynamic.endpoint,
  );

  return ends.inFailureDueTo(newSpecificationError);
});

export {
  default as ConnectionError,
} from './ServerConnectionError';

export {
  TextToImage_serverAccordingToEnvironment as accordingToEnvironment,
  TextToImage_retrieveCurrentServer as retrieveCurrent,
  TextToImage_Server_SpecificationError as SpecificationError,
};
