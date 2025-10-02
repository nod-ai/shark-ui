import WebAPI from '@/library/WebAPI';

import {
  TextToImage_Server_Origin,
} from '../Origin';

const TextToImage_Server_Current_accordingToEnvironment = ((): WebAPI.Server | null => {
  const originAccordingToEnvironment = import.meta.env[TextToImage_Server_Origin.environmentKey];

  if (
    originAccordingToEnvironment === undefined
  ) return null;

  const serverAccordingToEnvironment = new WebAPI.Server({
    origin: originAccordingToEnvironment,
  });

  return serverAccordingToEnvironment;
})();

export {
  TextToImage_Server_Current_accordingToEnvironment,
};
