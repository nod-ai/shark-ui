import type {
  TextToImage_Pipeline_Output,
} from '../definition.declared.ts';

const TextToImage_Pipeline_Output_Nullable_from = (
  givenImage: TextToImage_Pipeline_Output['image'] | null,
): TextToImage_Pipeline_Output | null => {
  if (
    givenImage === null
  ) return null;

  const derivedPipelineOutput = {
    image: givenImage,
  };

  return derivedPipelineOutput;
};

export {
  TextToImage_Pipeline_Output_Nullable_from,
};
