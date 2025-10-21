import {
  Effect,
} from 'effect';

import type {
  TextToImage_Pipeline_Output_Image,
} from './Image';

/** The resulting information after a text-to-image model has ingested some input with some configuration */
interface TextToImage_Pipeline_Output {
  image: TextToImage_Pipeline_Output_Image;
}

function TextToImage_Pipeline_Output(
  namespaceOnly: never = Effect.dieMessage(
    `Unexpected call of module augmentation provision for ${TextToImage_Pipeline_Output.name}.`,
  ).pipe(Effect.runSync),
): never {
  return namespaceOnly;
}

export {
  TextToImage_Pipeline_Output,
};
