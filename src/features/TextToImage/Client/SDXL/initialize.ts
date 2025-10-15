import {
  Exit,
} from 'effect';

import ShimmedStabilityAIClient from '@/library/ShimmedStabilityAIClient';

import {
  TextToImage_Server,
} from '../../Server';

const TextToImage_Client_SDXL_initialize = async (): Promise<
  Exit.Exit<
    ShimmedStabilityAIClient,
    TextToImage_Server.Error.MissingSpecification
  >
> => {
  const exitFromRetrievingCurrentServer = await TextToImage_Server.Current.retrieve();

  const exitFromInitializingClient = Exit.map(
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
