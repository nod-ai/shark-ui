import type {
  GenerateFromTextResponse,
} from 'stabilityai-client-typescript/models/operations';

import Attempt from '@/library/Attempt';
import Base64CharacterEncodedByteSequence from '@/library/customTypes/Base64CharacterEncodedByteSequence';
import ImageURI from '@/library/customTypes/UniformResourceIdentifier/Data/Image';

import {
  allSerialized,
} from '@/features/TextToImage/models/SDXL/client/conversions/TextPrompt';

import type {
  Input,
  Output,
} from '@/features/TextToImage/types';

const firstTextToImageOutput = (
  {
    in: givenResponse,
    inferredFrom: givenInputText,
  }: {
    in: GenerateFromTextResponse;
    inferredFrom: Input['text'];
  },
): Output => {
  if (
    !('artifacts' in givenResponse.result)
  ) return Attempt.abandon('Expected response body rather than readable stream');

  const generatedArtifacts = givenResponse.result.artifacts;

  if (
    generatedArtifacts === undefined
  ) return Attempt.abandon('Expected artifacts in response result');

  const [soleGeneratedArtifact] = generatedArtifacts;

  if (
    soleGeneratedArtifact === undefined
  ) return Attempt.abandon('Expected at least one artifact in response');

  if (
    soleGeneratedArtifact.base64 === undefined
  ) return Attempt.abandon('Expected image data from sole artifact');

  const base64DataOfNewImage = Base64CharacterEncodedByteSequence.forciblyParsedFrom(soleGeneratedArtifact.base64);

  const soleGeneratedOutputImage = {
    uri        : new ImageURI('png', 'base64', base64DataOfNewImage),
    description: allSerialized(givenInputText),
  };

  const soleGeneratedOutput = {
    image: soleGeneratedOutputImage,
  };

  return soleGeneratedOutput;
};

export {
  firstTextToImageOutput,
};
