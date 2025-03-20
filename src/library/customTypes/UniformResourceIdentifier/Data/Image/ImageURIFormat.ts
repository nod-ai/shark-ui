export const allImageURIFormats = [
  'png',
  'jpeg',
  'gif',
  'webp',
] as const;

export type ImageURIFormat = (typeof allImageURIFormats)[number];
