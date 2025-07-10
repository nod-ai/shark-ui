/* Defined in accordance with [RFC 2397 Section 2](https://www.rfc-editor.org/rfc/rfc2397#section-2) */
const DataURI_EncodingIdentifier_all = [
  'base64',
  /**
   * Means """
   *   - ASCII encoding for octets inside the range of safe URI characters
   *     AND
   *   - the standard %xx hex encoding of URIs for octets outside that range
   * """
   */
  'omitted',
] as const;

export {
  DataURI_EncodingIdentifier_all,
};
