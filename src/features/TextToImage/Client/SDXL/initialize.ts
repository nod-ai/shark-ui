import {
  Effect,
} from 'effect';

import ShimmedStabilityAIClient from '@/library/ShimmedStabilityAIClient';

import {
  TextToImage_Server,
} from '../../Server';

const TextToImage_Client_SDXL_initialize: Effect.Effect<
  ShimmedStabilityAIClient,
  TextToImage_Server.Error.MissingSpecification
> = Effect.gen(function* () {
  const currentTextToImageServer = yield* TextToImage_Server.Current.retrieve;

  const newStabilityAIClient = new ShimmedStabilityAIClient({
    serverURL: currentTextToImageServer.origin,
  });

  return newStabilityAIClient;
});

export {
  TextToImage_Client_SDXL_initialize,
};
