import type {
  GenerateFromTextRequest,
  GenerateFromTextResponse,
} from 'stabilityai-client-typescript/models/operations';

import Attempt from '@/library/Attempt';

import ShimmedStabilityAIClient from '@/library/ShimmedStabilityAIClient/index.ts';

import Base64CharacterEncodedByteSequence from '@/library/customTypes/Base64CharacterEncodedByteSequence.ts';

import ImageURI from '@/library/customTypes/UniformResourceIdentifier/Data/Image/index.ts';

import {
  asError,
} from '@/library/utilitiesByType/error';

import type {
  Output,
} from '@/features/TextToImage/types';
import {
  Server,
} from '@/features/TextToImage/webAPI';

const initializeShimmedStabilityAIClient = (): Promise<
  Attempt.Outcome<ShimmedStabilityAIClient, Server.SpecificationError>
> => Attempt.thatEventually(async (ends) => {
  const outcomeOfRetrievingCurrentServer = await Server.retrieveCurrent();

  if (
    outcomeOfRetrievingCurrentServer.isFailure
  ) {
    const {
      causeOfFailure,
    } = outcomeOfRetrievingCurrentServer;

    const userFacingMessage = [
      'No text-to-image server was specified!',
      'Either:',
      `a) supply it's corresponding environment variable named \`${causeOfFailure.environmentKey}\` and rebuild`,
      `b) specify it within ${causeOfFailure.file.toString()}`,
      'OR',
      `c) specify it within the response from ${causeOfFailure.endpoint.toString()}`,
    ].join('\n');

    causeOfFailure.message = userFacingMessage;
    return outcomeOfRetrievingCurrentServer;
  }

  const textToImageServer = outcomeOfRetrievingCurrentServer.unwrapped;

  const newClient = new ShimmedStabilityAIClient({
    serverURL: textToImageServer.origin,
  });

  return ends.inSuccessWith(newClient);
});

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
): Promise<OutcomeOfGeneratingTextToImageOutput> => Attempt.thatEventually(async (ends) => {
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

  let textToImageResponse: GenerateFromTextResponse;

  // eslint-disable-next-line no-restricted-syntax
  try {
    const outcomeOfSettlingTextToImageResponse = await Attempt.toSettle(promisedTextToImageResponse);

    if (
      outcomeOfSettlingTextToImageResponse.isFailure
    ) return outcomeOfSettlingTextToImageResponse.causeOfFailure.throwAnyway('Unreachable since `Attempt.toSettle` still throws everything');

    textToImageResponse = outcomeOfSettlingTextToImageResponse.unwrapped;
  }
  catch (whateverThatWasThrown) {
    const someError = asError(whateverThatWasThrown);
    const clientFailedToReachServer = someError.message.includes('Failed to fetch');

    if (
      !clientFailedToReachServer
    ) return Attempt.NonActionableError.rethrow(someError, {
      message: 'Text-to-image client failed to generate image due to an unexpected error',
    });

    return ends.inFailureDueTo(new Server.ConnectionError(shimmedStabilityAIClient.origin));
  }

  if (
    !('artifacts' in textToImageResponse.result)
  ) return ends.inFlamesBecause('Expected response rather than readable stream');

  const generatedArtifacts = textToImageResponse.result.artifacts;

  if (
    generatedArtifacts === undefined
  ) return ends.inFlamesBecause('Expected artifacts in response result');

  const [soleGeneratedArtifact] = generatedArtifacts;

  if (
    soleGeneratedArtifact === undefined
  ) return ends.inFlamesBecause('Expected at least one artifact in response');

  if (
    soleGeneratedArtifact.base64 === undefined
  ) return ends.inFlamesBecause('Expected image data from sole artifact');

  const base64DataOfNewImage = Base64CharacterEncodedByteSequence.forciblyParsedFrom(soleGeneratedArtifact.base64);

  const newImage = {
    uri        : new ImageURI('png', 'base64', base64DataOfNewImage),
    description: given.textToImageRequestBody.textPrompts
      .map($0 => (($0.weight === undefined) || ($0.weight === 1))
        ? $0.text
        : `(${$0.text}: ${$0.weight.toString()})`,
      )
      .join(', '),
  };

  return ends.inSuccessWith({
    image: newImage,
  });
});

const SDXLTextToImageClient = {
  generateOutputFrom,
};

export {
  SDXLTextToImageClient as default,
};
