import {
  StructuredSyntaxNameSuffix_ParsingError,
} from './ParsingError';

/** See [RFC 6838 Section 4.2.8](https://www.rfc-editor.org/rfc/rfc6838.html#section-4.2.8) for more information */
const StructuredSyntaxNameSuffix_allCases = [
  'xml',
  'json',
  'ber',
  'der',
  'fastinfoset',
  'wbxml',
  'zip',
  'gzip',
  'cbor',
  'json-seq',
  'cbor-seq',
] as const;

type StructuredSyntaxNameSuffix = (typeof StructuredSyntaxNameSuffix_allCases)[number];

const StructuredSyntaxNameSuffix = {
  allCases: StructuredSyntaxNameSuffix_allCases,
};

export {
  StructuredSyntaxNameSuffix as default,
  StructuredSyntaxNameSuffix_ParsingError,
};
