const allDataURIBinaryEncodings = [
  'base64',
  'utf8',
] as const;

type DataURIBinaryEncoding = (typeof allDataURIBinaryEncodings)[number];

export {
  allDataURIBinaryEncodings,
  type DataURIBinaryEncoding,
};
