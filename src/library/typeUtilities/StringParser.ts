export default interface StringParser<ParsedOutput> {
  forciblyParsedFrom(givenSubject: string): ParsedOutput;
}
