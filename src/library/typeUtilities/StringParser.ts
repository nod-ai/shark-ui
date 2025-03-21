export default interface StringParser<ParsedOutput> {
  tryToParseFrom(givenSubject: string): ParsedOutput;
}
