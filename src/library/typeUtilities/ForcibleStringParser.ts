interface ForcibleStringParser<ParsedOutput> {
  forciblyParsedFrom(givenSubject: string): ParsedOutput;
}

export type {
  ForcibleStringParser as default,
};
