import type {
  TextPrompt,
} from 'stabilityai-client-typescript/models/components';

enum ImageGenerationPromptWeight {
  positive,
  negative,
}

export const quantitative = (givenQualitativeWeight: ImageGenerationPromptWeight): TextPrompt['weight'] => {
  switch (givenQualitativeWeight) {
    case ImageGenerationPromptWeight.positive: return +1;
    case ImageGenerationPromptWeight.negative: return -1;
  }
};

export default ImageGenerationPromptWeight;
