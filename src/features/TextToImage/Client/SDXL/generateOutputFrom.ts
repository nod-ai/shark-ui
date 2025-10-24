import {
  HttpClientError,
} from '@effect/platform';

import {
  Effect,
} from 'effect';

import type {
  GenerateFromTextRequest,
} from 'stabilityai-client-typescript/models/operations';

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

const TextToImage_Client_SDXL_generateOutputFrom = (
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
): TextToImage_Client_Generation.Effect => Effect.gen(function* () {
  const shimmedStabilityAIClient = yield* TextToImage_Client_SDXL_initialize;

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

  const textToImageResponse = yield* Effect.tryPromise(() => promisedTextToImageResponse).pipe(
    Effect.catchAll((someException) => {
      const caughtError = someException.cause;

      if (
        HttpClientError.isHttpClientError(caughtError)
        && (caughtError.reason === 'Transport')
      ) return new TextToImage_Server.Error.FailedToConnect(caughtError);

      return Effect.die(caughtError);
    }),
  );

  const soleTextToImageOutput = yield* toSharkUIOutput.first({
    in          : textToImageResponse,
    inferredFrom: given.textToImageRequestBody.textPrompts,
  });

  return soleTextToImageOutput;
});

export {
  TextToImage_Client_SDXL_generateOutputFrom,
};
