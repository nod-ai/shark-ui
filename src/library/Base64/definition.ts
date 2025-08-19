const Base64 = {
  /** See [RFC 4648 Section 4](https://www.rfc-editor.org/rfc/rfc4648.html#section-4) for more information */
  Alphabet: {
    length : 64,
    pattern: /A-Za-z\d\+\//,
  },
  get bitWidth() {
    return Math.log2(this.Alphabet.length);
  },
};

export {
  Base64 as default,
};
