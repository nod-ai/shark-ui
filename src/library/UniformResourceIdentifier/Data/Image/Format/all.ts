/** For an exhaustive list, see [the IANA registry](https://www.iana.org/assignments/media-types/media-types.xhtml#image) */
const URI_Image_Format_all = [
  // https://www.iana.org/assignments/media-types/image/png
  'png',
  // https://www.iana.org/assignments/media-types/image/jpeg
  'jpeg',
  // https://www.iana.org/assignments/media-types/image/gif
  'gif',
  // https://www.iana.org/assignments/media-types/image/webp
  'webp',
] as const;

export {
  URI_Image_Format_all,
};
