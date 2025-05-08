import {
  Server,
} from '@/library/WebAPI';

import {
  DynamicConfig,
  StaticConfig,
} from '../config';

const environmentKeyForOrigin = 'VITE__TEXT_TO_IMAGE__API__SERVER__ORIGIN';

export const accordingToEnvironment = ((): Server | null => {
  const originAccordingToEnvironment = import.meta.env[environmentKeyForOrigin];

  if (
    originAccordingToEnvironment === undefined
  ) return null;

  return Server.from({
    origin: originAccordingToEnvironment,
  });
})();

export const tryToRetrieveCurrent = async (): Promise<Server> => {
  if (
    accordingToEnvironment !== null
  ) return accordingToEnvironment;

  const staticConfig = await StaticConfig.tryToRead();

  if (
    staticConfig.server !== null
  ) return staticConfig.server;

  const dynamicConfig = await DynamicConfig.forciblyFetch();

  if (
    dynamicConfig.server !== null
  ) return dynamicConfig.server;

  const serverNotSpecifiedErrorMessage = [
    'No text-to-image server was specified!',
    'Either:',
    `a) supply it's corresponding environment variable named \`${environmentKeyForOrigin}\` and rebuild`,
    `b) specify it within ${StaticConfig.file.toString()}`,
    'OR',
    `c) specify it within the response from ${DynamicConfig.endpoint.toString()}`,
  ].join('\n');

  throw new Error(serverNotSpecifiedErrorMessage);
};
