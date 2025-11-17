import {
  Data,
} from 'effect';

import type URI from '@/library/URI';

interface TextToImage_Pipeline_Output_Image {
  uri: URI.Image;
  description: string;
}

const TextToImage_Pipeline_Output_Image = Data.case<TextToImage_Pipeline_Output_Image>();

export {
  TextToImage_Pipeline_Output_Image,
};
