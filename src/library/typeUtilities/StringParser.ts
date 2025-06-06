interface StringParser<ParsedOutput> {
  forciblyParsedFrom(givenSubject: string): ParsedOutput;
}

export {
  type StringParser as default,
};
