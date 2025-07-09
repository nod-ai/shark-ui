/** See [RFC 6838 Section 4.2.8](https://www.rfc-editor.org/rfc/rfc6838.html#section-4.2.8) for more information */
const MediaType_StructuredSyntaxNameSuffix_all = [
  'xml',
  'json',
  'ber',
  'der',
  'fastinfoset', // cspell:words fastinfoset
  'wbxml', // cspell:words wbxml
  'zip',
  'gzip',
  'cbor', // cspell:words cbor
  'json-seq',
  'cbor-seq',
] as const;

export {
  MediaType_StructuredSyntaxNameSuffix_all,
};
