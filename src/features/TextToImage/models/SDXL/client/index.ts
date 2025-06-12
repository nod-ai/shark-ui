import type {
  GenerateFromTextRequest,
} from 'stabilityai-client-typescript/models/operations';

import Attempt from '@/library/Attempt';

import {
  sanctionedAsync,
} from '@/library/Attempt/utilities/sanctionedTryCatch';

import ShimmedStabilityAIClient from '@/library/ShimmedStabilityAIClient/index.ts';

import Base64CharacterEncodedByteSequence from '@/library/customTypes/Base64CharacterEncodedByteSequence.ts';

import ImageURI from '@/library/customTypes/UniformResourceIdentifier/Data/Image/index.ts';

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
  ) return outcomeOfRetrievingCurrentServer;

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

  const outcomeOfSettlingTextToImageResponse = await sanctionedAsync({
    async try() {
      const intermediateOutcome = await Attempt.toSettle(promisedTextToImageResponse);

      if (
        intermediateOutcome.isFailure
      ) return intermediateOutcome.causeOfFailure.throwAnyway('Unreachable since `Attempt.toSettle` still throws everything');

      return intermediateOutcome;
    },
    catch(someError) {
      let interpretedError: Server.ConnectionError | null;
      const clientFailedToReachServer = someError.message.includes('Failed to fetch');

      if (
        !clientFailedToReachServer
      ) {
        interpretedError = null;
      }
      else {
        interpretedError = new Server.ConnectionError(shimmedStabilityAIClient.origin);
        return ends.inFailureDueTo(interpretedError);
      }

      return Attempt.NonActionableError.rethrow(someError, {
        message: 'Text-to-image client failed to generate image due to an unexpected error',
      });
    },
  });

  if (
    outcomeOfSettlingTextToImageResponse.isFailure
  ) return outcomeOfSettlingTextToImageResponse;

  const textToImageResponse = outcomeOfSettlingTextToImageResponse.unwrapped;

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
