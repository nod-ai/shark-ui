class ImageURIParsingError extends Error {
  public constructor(givenMessage: string) {
    super(givenMessage);
    this.name = 'ImageURIParsingError';
  }
}

export default ImageURIParsingError;
