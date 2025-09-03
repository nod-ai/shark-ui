import {
  Server as WebAPI_Server,
} from '@/library/WebAPI';

import {
  TextToImage_Server_Origin,
} from '../Origin';

const TextToImage_Server_Current_accordingToEnvironment = ((): WebAPI_Server | null => {
  const originAccordingToEnvironment = import.meta.env[TextToImage_Server_Origin.environmentKey];

  if (
    originAccordingToEnvironment === undefined
  ) return null;

  const serverAccordingToEnvironment = WebAPI_Server.from({
    origin: originAccordingToEnvironment,
  });

  return serverAccordingToEnvironment;
})();

export {
  TextToImage_Server_Current_accordingToEnvironment,
};
