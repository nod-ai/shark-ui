class DataURIParsingError extends Error {
  public constructor(givenMessage: string) {
    super(givenMessage);
    this.name = 'URIParsingError';
  }
}

export default DataURIParsingError;
