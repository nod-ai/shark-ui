import {
  Option,
} from 'effect';

import type {
  TextToImage_Pipeline_Output,
} from '../definition.declared.ts';

const TextToImage_Pipeline_Output_Option_from = (
  givenImage: Option.Option<TextToImage_Pipeline_Output['image']>,
): Option.Option<TextToImage_Pipeline_Output> => Option.map(
  givenImage,
  ($0) => ({
    image: $0,
  }),
);

export {
  TextToImage_Pipeline_Output_Option_from,
};
