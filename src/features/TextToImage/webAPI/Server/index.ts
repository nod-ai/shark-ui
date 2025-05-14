import {
  Server,
} from '@/library/WebAPI';

import {
  DynamicConfig,
  StaticConfig,
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

const forciblyRetrieveCurrentTextToImageServer = async (): Promise<Server> => {
  // eslint-disable-next-line no-restricted-syntax
  try {
    if (
      textToImageServerAccordingToEnvironment !== null
    ) return textToImageServerAccordingToEnvironment;

    const staticConfig = await StaticConfig.forciblyRead();

    if (
      staticConfig.server !== null
    ) return staticConfig.server;

    const dynamicConfig = await DynamicConfig.forciblyFetch();

    if (
      dynamicConfig.server !== null
    ) return dynamicConfig.server;

    throw new TextToImage_Server_SpecificationError({
      environmentKey: environmentKeyForOriginOfTextToImageServer,
      file          : StaticConfig.file,
      endpoint      : DynamicConfig.endpoint,
    });
  }
  catch {
    throw new TextToImage_Server_SpecificationError({
      environmentKey: environmentKeyForOriginOfTextToImageServer,
      file          : StaticConfig.file,
      endpoint      : DynamicConfig.endpoint,
    });
  }
};

export {
  textToImageServerAccordingToEnvironment as accordingToEnvironment,
  forciblyRetrieveCurrentTextToImageServer as forciblyRetrieveCurrent,
  TextToImage_Server_SpecificationError as SpecificationError,
};
