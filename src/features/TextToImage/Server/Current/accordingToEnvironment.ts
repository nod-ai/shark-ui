import {
  Option,
} from 'effect';

import WebAPI from '@/library/WebAPI';

import {
  TextToImage_Server_Origin,
} from '../Origin';

const TextToImage_Server_Current_accordingToEnvironment = ((): Option.Option<WebAPI.Server> => {
  const originAccordingToEnvironment = Option.fromNullable(import.meta.env[TextToImage_Server_Origin.environmentKey]);

  const serverAccordingToEnvironment = Option.map(
    originAccordingToEnvironment,
    ($0) => new WebAPI.Server({
      origin: $0,
    }),
  );

  return serverAccordingToEnvironment;
})();

export {
  TextToImage_Server_Current_accordingToEnvironment,
};
