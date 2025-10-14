import Attempt from '@/library/Attempt';
import ShimmedStabilityAIClient from '@/library/ShimmedStabilityAIClient';

import {
  TextToImage_Server,
} from '../../Server';

const TextToImage_Client_SDXL_initialize = async (): Promise<
  Attempt.Exit.Exit<
    ShimmedStabilityAIClient,
    TextToImage_Server.Error.MissingSpecification
  >
> => {
  const exitFromRetrievingCurrentServer = await TextToImage_Server.Current.retrieve();

  const exitFromInitializingClient = Attempt.Exit.map(
    exitFromRetrievingCurrentServer,
    textToImageServer => new ShimmedStabilityAIClient({
      serverURL: textToImageServer.origin,
    }),
  );

  return exitFromInitializingClient;
};

export {
  TextToImage_Client_SDXL_initialize,
};
