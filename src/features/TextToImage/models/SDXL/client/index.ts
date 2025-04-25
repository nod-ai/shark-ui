import type {
  GenerateFromTextRequest,
} from 'stabilityai-client-typescript/models/operations';

import ShimmedStabilityAIClient from '@/library/ShimmedStabilityAIClient/index.ts';

import Base64CharacterEncodedByteSequence from '@/library/customTypes/Base64CharacterEncodedByteSequence.ts';

import ImageURI from '@/library/customTypes/UniformResourceIdentifier/Data/Image/index.ts';

import type {
  Output,
} from '@/features/TextToImage/types';

const shimmedStabilityAIClient = new ShimmedStabilityAIClient({
  serverURL: import.meta.env.VITE__TEXT_TO_IMAGE__API__SERVER__ORIGIN,
});

export const tryToGenerateOutputFrom = async (
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
  const textToImageResponse = await shimmedStabilityAIClient.version1.image.tryToGenerateFromText({
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

  const base64DataOfNewImage = Base64CharacterEncodedByteSequence.tryToParseFrom(soleGeneratedArtifact.base64);

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
  tryToGenerateOutputFrom,
};

export default SDXLTextToImageClient;
