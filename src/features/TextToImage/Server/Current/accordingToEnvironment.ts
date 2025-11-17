import {
  Option,
} from 'effect';

import WebAPI from '@/library/WebAPI';

import {
  TextToImage_Server_Origin,
} from '../Origin';

const TextToImage_Server_Current_accordingToEnvironment = Option.gen(function* () {
  const originAccordingToEnvironment = yield* Option.fromNullable(import.meta.env[TextToImage_Server_Origin.environmentKey]);

  const serverAccordingToEnvironment = new WebAPI.Server({
    origin: originAccordingToEnvironment,
  });

  return serverAccordingToEnvironment;
});

export {
  TextToImage_Server_Current_accordingToEnvironment,
};
