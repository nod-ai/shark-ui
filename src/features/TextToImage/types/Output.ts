import type ImageURI from '@/library/customTypes/UniformResourceIdentifier/Data/Image';

/** The resulting information after a text-to-image model has ingested some input with some configuration */
export interface TextToImage_Output {
  image: {
    uri: ImageURI;
    description: string;
  };
}
