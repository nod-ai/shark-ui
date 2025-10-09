import Attempt from '@/library/Attempt';
import ShimmedStabilityAIClient from '@/library/ShimmedStabilityAIClient';

import {
  TextToImage_Server,
} from '../../Server';

const TextToImage_Client_SDXL_initialize = async (): Promise<
  Attempt.Outcome<
    ShimmedStabilityAIClient,
    TextToImage_Server.Error.MissingSpecification
  >
> => {
  const outcomeOfRetrievingCurrentServer = await TextToImage_Server.Current.retrieve();

  const outcomeOfInitializingClient = Attempt.Outcome.fromRewrapping(
    outcomeOfRetrievingCurrentServer,
    textToImageServer => new ShimmedStabilityAIClient({
      serverURL: textToImageServer.origin,
    }),
  );

  return outcomeOfInitializingClient;
};

export {
  TextToImage_Client_SDXL_initialize,
};
