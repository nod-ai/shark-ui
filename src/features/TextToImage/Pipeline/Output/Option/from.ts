import {
  Option,
} from 'effect';

import {
  TextToImage_Pipeline_Output,
} from '../definition.declared.ts';

const TextToImage_Pipeline_Output_Option_from = (
  givenImage: Option.Option<TextToImage_Pipeline_Output['image']>,
): Option.Option<TextToImage_Pipeline_Output> => Option.gen(function* () {
  return new TextToImage_Pipeline_Output({
    image: yield* givenImage,
  });
});

export {
  TextToImage_Pipeline_Output_Option_from,
};
