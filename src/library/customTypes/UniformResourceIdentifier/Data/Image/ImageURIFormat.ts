const allImageURIFormats = [
  'png',
  'jpeg',
  'gif',
  'webp',
] as const;

type ImageURIFormat = (typeof allImageURIFormats)[number];

export {
  allImageURIFormats,
  type ImageURIFormat,
};
