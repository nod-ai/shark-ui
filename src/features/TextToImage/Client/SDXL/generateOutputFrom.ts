import type {
  GenerateFromTextRequest,
} from 'stabilityai-client-typescript/models/operations';

import Attempt from '@/library/Attempt';
import HTTP from '@/library/HTTP';

import {
  TextToImage_Server,
} from '../../Server';

import type {
  TextToImage_Client_Generation,
} from '../Generation';

import {
  TextToImage_Client_SDXL_initialize,
} from './initialize';

import {
  toSharkUIOutput,
} from './toSharkUIOutput';

const TextToImage_Client_SDXL_generateOutputFrom = async (
  given: {
    textToImageRequestBody: Pick<GenerateFromTextRequest['textToImageRequestBody'],
    | 'textPrompts'
    | 'height'
    | 'width'
    | 'steps'
    | 'cfgScale'
    | 'seed'
    >;
  },
): Promise<
  TextToImage_Client_Generation.Outcome
> => {
  const outcomeOfInitializingClient = await TextToImage_Client_SDXL_initialize();

  if (
    outcomeOfInitializingClient.isFailure
  ) return outcomeOfInitializingClient;

  const shimmedStabilityAIClient = outcomeOfInitializingClient.unwrapped;

  const promisedTextToImageResponse = shimmedStabilityAIClient.version1.image.forciblyGenerateFromText({
    engineId              : 'stable-diffusion-xl-1024-v1-0',
    textToImageRequestBody: {
      textPrompts: given.textToImageRequestBody.textPrompts,
      height     : given.textToImageRequestBody.height,
      width      : given.textToImageRequestBody.width,
      seed       : given.textToImageRequestBody.seed,
      steps      : given.textToImageRequestBody.steps,
      cfgScale   : given.textToImageRequestBody.cfgScale,
    },
  });

  const outcomeOfSettlingTextToImageResponse = await Attempt.Adapted.toSettle(promisedTextToImageResponse, {
    interpretationOf: (caughtError) => {
      if (
        !(caughtError instanceof HTTP.Endpoint.Error.FailedToSendRequest)
      ) return null;

      return new TextToImage_Server.Error.FailedToConnect(caughtError.endpoint);
    },
  });

  const outcomeOfSettlingSoleTextToImageOutput = Attempt.Outcome.fromRewrapping(outcomeOfSettlingTextToImageResponse, {
    product: textToImageResponse => toSharkUIOutput.first({
      in          : textToImageResponse,
      inferredFrom: given.textToImageRequestBody.textPrompts,
    }),
  });

  return outcomeOfSettlingSoleTextToImageOutput;
};

export {
  TextToImage_Client_SDXL_generateOutputFrom,
};
