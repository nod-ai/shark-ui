import {
  Effect,
  Exit,
} from 'effect';

import type {
  GenerateFromTextRequest,
} from 'stabilityai-client-typescript/models/operations';

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
  TextToImage_Client_Generation.Exit
> => {
  const exitFromInitializingClient = await TextToImage_Client_SDXL_initialize();

  if (
    Exit.isFailure(exitFromInitializingClient)
  ) return Exit.failCause(exitFromInitializingClient.cause);

  const shimmedStabilityAIClient = exitFromInitializingClient.value;

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

  const exitFromSettlingTextToImageResponse = await Effect.runPromiseExit(Effect.tryPromise(() => promisedTextToImageResponse).pipe(
    Effect.catchAll((someException) => {
      const caughtError = someException.cause;

      if (
        caughtError instanceof HTTP.Endpoint.Error.FailedToSendRequest
      ) return new TextToImage_Server.Error.FailedToConnect(caughtError);

      return Effect.die(caughtError);
    }),
  ));

  const exitFromSettlingSoleTextToImageOutput = Exit.map(
    exitFromSettlingTextToImageResponse,
    textToImageResponse => toSharkUIOutput.first({
      in          : textToImageResponse,
      inferredFrom: given.textToImageRequestBody.textPrompts,
    }),
  );

  return exitFromSettlingSoleTextToImageOutput;
};

export {
  TextToImage_Client_SDXL_generateOutputFrom,
};
