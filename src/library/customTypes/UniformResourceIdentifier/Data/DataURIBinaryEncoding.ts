export const allDataURIBinaryEncodings = [
  'base64',
  'utf8',
] as const;

export type DataURIBinaryEncoding = (typeof allDataURIBinaryEncodings)[number];
