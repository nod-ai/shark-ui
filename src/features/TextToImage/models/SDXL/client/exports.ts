import type {
  GenerateFromTextRequest,
} from 'stabilityai-client-typescript/models/operations';

import Attempt from '@/library/Attempt';
import HTTP from '@/library/HTTP';
import ShimmedStabilityAIClient from '@/library/ShimmedStabilityAIClient/definition';

import type {
  Output,
} from '@/features/TextToImage/types';

import {
  Server,
} from '@/features/TextToImage/webAPI';

import {
  firstTextToImageOutput,
} from './conversions/GenerateFromTextResponse';

const initializeShimmedStabilityAIClient = async (): Promise<
  Attempt.Outcome<ShimmedStabilityAIClient, Server.SpecificationError>
> => {
  const outcomeOfRetrievingCurrentServer = await Server.retrieveCurrent();

  const outcomeOfInitializingClient = Attempt.Outcome.fromRewrapping(outcomeOfRetrievingCurrentServer, {
    product: textToImageServer => new ShimmedStabilityAIClient({
      serverURL: textToImageServer.origin,
    }),
  });

  return outcomeOfInitializingClient;
};

type OutcomeOfGeneratingTextToImageOutput = Attempt.Outcome<Output,
  | Server.ConnectionError
  | Server.SpecificationError
>;

const generateOutputFrom = async (
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
): Promise<OutcomeOfGeneratingTextToImageOutput> => {
  const outcomeOfInitializingClient = await initializeShimmedStabilityAIClient();

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

  const outcomeOfSettlingTextToImageResponse = await Attempt.toSettle(promisedTextToImageResponse, {
    interpretationOf: (caughtError) => {
      if (
        !(caughtError instanceof HTTP.Endpoint.RequestError)
      ) return null;

      return new Server.ConnectionError(caughtError.endpoint);
    },
  });

  const outcomeOfSettlingSoleTextToImageOutput = Attempt.Outcome.fromRewrapping(outcomeOfSettlingTextToImageResponse, {
    product: textToImageResponse => firstTextToImageOutput({
      in          : textToImageResponse,
      inferredFrom: given.textToImageRequestBody.textPrompts,
    }),
  });

  return outcomeOfSettlingSoleTextToImageOutput;
};

const SDXLTextToImageClient = {
  generateOutputFrom,
};

export {
  SDXLTextToImageClient as default,
};
