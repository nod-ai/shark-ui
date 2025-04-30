import {
  Server,
} from '@/library/WebAPI';

import {
  DynamicConfig,
  StaticConfig,
} from '../config';

export const environmentKeyForOrigin = 'VITE__TEXT_TO_IMAGE__API__SERVER__ORIGIN';

export const accordingToEnvironment = ((): Server | null => {
  const originAccordingToEnvironment = import.meta.env[environmentKeyForOrigin];

  if (
    originAccordingToEnvironment === undefined
  ) return null;

  return Server.from({
    origin: originAccordingToEnvironment,
  });
})();

export const tryToGetFrom = async (): Promise<Server> => {
  if (
    accordingToEnvironment !== null
  ) return accordingToEnvironment;

  const staticConfig = await StaticConfig.tryToRead();

  if (
    staticConfig.server !== null
  ) return staticConfig.server;

  const dynamicConfig = await DynamicConfig.tryToFetch();

  if (
    dynamicConfig.server !== null
  ) return dynamicConfig.server;

  throw new Error('Server not specified');
};
