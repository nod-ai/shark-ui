import {
  Outcome,
} from '@/library/Attempt';

import {
  Server,
} from '@/library/WebAPI';

import {
  DynamicConfig,
  StaticConfig,
  emptyConfig,
} from '../../config';

export {
  default as ConnectionError,
} from './ServerConnectionError';

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

const retrieveCurrentTextToImageServer = async (): Promise<
  Outcome<Server, TextToImage_Server_SpecificationError>
> => {
  if (
    textToImageServerAccordingToEnvironment !== null
  ) return Outcome.successThatYielded(textToImageServerAccordingToEnvironment);

  const staticConfig = (await StaticConfig.read()).optionallyUnwrap() ?? emptyConfig;

  if (
    staticConfig.server !== null
  ) return Outcome.successThatYielded(staticConfig.server);

  const dynamicConfig = (await DynamicConfig.fetch()).optionallyUnwrap() ?? emptyConfig;

  if (
    dynamicConfig.server !== null
  ) return Outcome.successThatYielded(dynamicConfig.server);

  const newSpecificationError = new TextToImage_Server_SpecificationError({
    environmentKey: environmentKeyForOriginOfTextToImageServer,
    file          : StaticConfig.file,
    endpoint      : DynamicConfig.endpoint,
  });

  return Outcome.failureDueTo(newSpecificationError);
};

export {
  textToImageServerAccordingToEnvironment as accordingToEnvironment,
  retrieveCurrentTextToImageServer as retrieveCurrent,
  TextToImage_Server_SpecificationError as SpecificationError,
};
