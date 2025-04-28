import {
  Server,
} from '@/library/WebAPI';

export const environmentKeyForOrigin = 'VITE__TEXT_TO_IMAGE__API__SERVER__ORIGIN';

export const accordingToEnvironment = ((): Server => {
  const originAccordingToEnvironment = import.meta.env[environmentKeyForOrigin];

  return Server.from({
    origin: originAccordingToEnvironment,
  });
})();
