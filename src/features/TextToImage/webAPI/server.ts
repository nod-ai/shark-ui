import {
  Server,
} from '@/library/WebAPI';

import {
  URLPath,
} from '@/library/customTypes/URLComponent';

import {
  ApplicationConfig,
} from '@/utilities/ApplicationConfig';

export const environmentKeyForOrigin = 'VITE__TEXT_TO_IMAGE__API__SERVER__ORIGIN';

export const filePath = URLPath.tryToParseFrom('/config');

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

  const fetchedConfig = await ApplicationConfig.tryToFetchFrom(filePath);
  return fetchedConfig.server;
};
