import Attempt from '@/library/Attempt';

import {
  Server,
} from '@/library/WebAPI/exports';

import {
  DynamicConfig,
  StaticConfig,
  emptyConfig,
} from '../../config';

import TextToImage_Server_SpecificationError from './ServerSpecificationError';

const environmentKeyForOriginOfTextToImageServer = 'VITE__TEXT_TO_IMAGE__API__SERVER__ORIGIN';

const textToImageServerAccordingToEnvironment = ((): Server | null => {
  const originAccordingToEnvironment = import.meta.env[environmentKeyForOriginOfTextToImageServer];

  if (
    originAccordingToEnvironment === undefined
  ) return null;

  return Server.from({
    origin: originAccordingToEnvironment,
  });
})();

const retrieveCurrentTextToImageServer = (): Promise<
  Attempt.Outcome<Server, TextToImage_Server_SpecificationError>
> => Attempt.thatEventually(async (ends) => {
  if (
    textToImageServerAccordingToEnvironment !== null
  ) return ends.inSuccessWith(textToImageServerAccordingToEnvironment);

  const staticConfig = (await StaticConfig.read()).optionallyUnwrap() ?? emptyConfig;

  if (
    staticConfig.server !== null
  ) return ends.inSuccessWith(staticConfig.server);

  const dynamicConfig = (await DynamicConfig.fetch()).optionallyUnwrap() ?? emptyConfig;

  if (
    dynamicConfig.server !== null
  ) return ends.inSuccessWith(dynamicConfig.server);

  const newSpecificationError = new TextToImage_Server_SpecificationError(
    environmentKeyForOriginOfTextToImageServer,
    StaticConfig.file,
    DynamicConfig.endpoint,
  );

  return ends.inFailureDueTo(newSpecificationError);
});

export {
  default as ConnectionError,
} from './ServerConnectionError';

export {
  textToImageServerAccordingToEnvironment as accordingToEnvironment,
  retrieveCurrentTextToImageServer as retrieveCurrent,
  TextToImage_Server_SpecificationError as SpecificationError,
};
