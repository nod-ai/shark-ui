import type {
  GenerateFromTextRequest,
} from 'stabilityai-client-typescript/models/operations';

import Attempt from '@/library/Attempt';
import HTTP from '@/library/HTTP';
import ShimmedStabilityAIClient from '@/library/ShimmedStabilityAIClient';

import type {
  Output as TextToImage_Pipeline_Output,
} from '@/features/TextToImage/types';

import * as TextToImage_Server from '../../Server';

import {
  firstTextToImageOutput,
} from './conversions/GenerateFromTextResponse';

const TextToImage_Client_initializeShimmedStabilityAI = async (): Promise<
  Attempt.Outcome<ShimmedStabilityAIClient, TextToImage_Server.SpecificationError>
> => {
  const outcomeOfRetrievingCurrentServer = await TextToImage_Server.retrieveCurrent();

  const outcomeOfInitializingClient = Attempt.Outcome.fromRewrapping(outcomeOfRetrievingCurrentServer, {
    product: textToImageServer => new ShimmedStabilityAIClient({
      serverURL: textToImageServer.origin,
    }),
  });

  return outcomeOfInitializingClient;
};

type TextToImage_Client_OutcomeOfGeneratingOutput = Attempt.Outcome<TextToImage_Pipeline_Output,
  | TextToImage_Server.ConnectionError
  | TextToImage_Server.SpecificationError
>;

const TextToImage_Client_generateOutputFrom = async (
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
): Promise<TextToImage_Client_OutcomeOfGeneratingOutput> => {
  const outcomeOfInitializingClient = await TextToImage_Client_initializeShimmedStabilityAI();

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

      return new TextToImage_Server.ConnectionError(caughtError.endpoint);
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

const TextToImage_Client_SDXL = {
  generateOutputFrom: TextToImage_Client_generateOutputFrom,
};

export {
  TextToImage_Client_SDXL,
};
