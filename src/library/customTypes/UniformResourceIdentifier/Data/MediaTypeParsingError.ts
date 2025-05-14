class MediaTypeParsingError extends Error {
  public constructor(givenMessage: string) {
    super(givenMessage);
    this.name = 'MediaTypeParsingError';
  }
}

export default MediaTypeParsingError;
