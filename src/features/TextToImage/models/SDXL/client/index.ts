import type {
  GenerateFromTextRequest,
  GenerateFromTextResponse,
} from 'stabilityai-client-typescript/models/operations';

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

const forciblyInitializeShimmedStabilityAIClient = async (): Promise<ShimmedStabilityAIClient> => {
  const textToImageServer = await Server.forciblyRetrieveCurrent();

  return new ShimmedStabilityAIClient({
    serverURL: textToImageServer.origin,
  });
};

export const forciblyGenerateOutputFrom = async (
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
): Promise<Output> => {
  const shimmedStabilityAIClient = await forciblyInitializeShimmedStabilityAIClient();

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

  try {
    textToImageResponse = await promisedTextToImageResponse;
  }
  catch (someException) {
    const someError = asError(someException);
    const clientFailedToReachServer = someError.message.includes('Failed to fetch');

    if (
      !clientFailedToReachServer
    ) throw someError;

    const serverConnectionException = [
      'Failed to reach the text-to-image server.',
      `Are you sure it's running?`,
    ].join('\n');

    throw new Error(serverConnectionException);
  }

  if (
    !('artifacts' in textToImageResponse.result)
  ) throw new Error('Expected response rather than readable stream');

  const generatedArtifacts = textToImageResponse.result.artifacts;

  if (
    generatedArtifacts === undefined
  ) throw new Error('Expected artifacts in response result');

  const [soleGeneratedArtifact] = generatedArtifacts;

  if (
    soleGeneratedArtifact === undefined
  ) throw new Error('Expected at least one artifact in response');

  if (
    soleGeneratedArtifact.base64 === undefined
  ) throw new Error('Expected image data from sole artifact');

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

  return {
    image: newImage,
  };
};

const SDXLTextToImageClient = {
  forciblyGenerateOutputFrom,
};

export default SDXLTextToImageClient;
