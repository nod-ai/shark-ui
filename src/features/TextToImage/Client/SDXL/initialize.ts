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
> = Effect.suspend(() => {
  const effectOfRetrievingCurrentServer = TextToImage_Server.Current.retrieve;

  const effectOfInitializingClient = Effect.map(
    effectOfRetrievingCurrentServer,
    textToImageServer => new ShimmedStabilityAIClient({
      serverURL: textToImageServer.origin,
    }),
  );

  return effectOfInitializingClient;
});

export {
  TextToImage_Client_SDXL_initialize,
};
