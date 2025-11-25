import type {
  TextPrompt,
} from 'stabilityai-client-typescript/models/components';

import type {
  TextToImage_Pipeline,
} from '@/features/TextToImage/Pipeline'; // eslint-disable-line import/no-internal-modules -- more concise than relative import

import {
  toAMDSharkUIOutput_Image_Description_singular,
} from './singular';

const toAMDSharkUIOutput_Image_Description_all = (
  givenPrompts: TextPrompt[],
): TextToImage_Pipeline.Output['image']['description'] => givenPrompts
  .map(toAMDSharkUIOutput_Image_Description_singular)
  .join(', ');

export {
  toAMDSharkUIOutput_Image_Description_all,
};
