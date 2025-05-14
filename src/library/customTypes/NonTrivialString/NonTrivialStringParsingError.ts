class NonTrivialStringParsingError extends Error {
  public constructor(givenCulprit: string) {
    super(`Expected string to contain something beyond just whitespace, got "${givenCulprit}"`);
    this.name = 'NonTrivialStringParsingError';
  }
}

export default NonTrivialStringParsingError;
