import Attempt from '@/library/Attempt';

import {
  Server as WebAPI_Server,
} from '@/library/WebAPI';

import {
  Config_Dynamic as TextToImage_Config_Dynamic,
  Config_Static as TextToImage_Config_Static,
  TextToImage_Config_empty,
} from '../Config';

import TextToImage_Server_SpecificationError from './ServerSpecificationError';

const TextToImage_Server_environmentKeyForOrigin = 'VITE__TEXT_TO_IMAGE__API__SERVER__ORIGIN';

const TextToImage_Server_accordingToEnvironment = ((): WebAPI_Server | null => {
  const originAccordingToEnvironment = import.meta.env[TextToImage_Server_environmentKeyForOrigin];

  if (
    originAccordingToEnvironment === undefined
  ) return null;

  return WebAPI_Server.from({
    origin: originAccordingToEnvironment,
  });
})();

const TextToImage_Server_retrieveCurrent = (): Promise<
  Attempt.Outcome<WebAPI_Server, TextToImage_Server_SpecificationError>
> => Attempt.thatEventually(async (ends) => {
  if (
    TextToImage_Server_accordingToEnvironment !== null
  ) return ends.inSuccessWith(TextToImage_Server_accordingToEnvironment);

  const staticConfig = (await TextToImage_Config_Static.read()).optionallyUnwrap() ?? TextToImage_Config_empty;

  if (
    staticConfig.server !== null
  ) return ends.inSuccessWith(staticConfig.server);

  const dynamicConfig = (await TextToImage_Config_Dynamic.fetch()).optionallyUnwrap() ?? TextToImage_Config_empty;

  if (
    dynamicConfig.server !== null
  ) return ends.inSuccessWith(dynamicConfig.server);

  const newSpecificationError = new TextToImage_Server_SpecificationError(
    TextToImage_Server_environmentKeyForOrigin,
    TextToImage_Config_Static.file,
    TextToImage_Config_Dynamic.endpoint,
  );

  return ends.inFailureDueTo(newSpecificationError);
});

export {
  default as ConnectionError,
} from './ServerConnectionError';

export {
  TextToImage_Server_accordingToEnvironment as accordingToEnvironment,
  TextToImage_Server_retrieveCurrent as retrieveCurrent,
  TextToImage_Server_SpecificationError as SpecificationError,
};
