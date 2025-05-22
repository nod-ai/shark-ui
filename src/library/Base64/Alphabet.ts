/** See [RFC 4648 Section 4](https://www.rfc-editor.org/rfc/rfc4648.html#section-4) for more information */
const Base64_Alphabet = {
  length : 64,
  pattern: /A-Za-z\d\+\//,
};

export {
  Base64_Alphabet as default,
};
