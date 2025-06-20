import Attempt from '@/library/Attempt';

import {
  StructuredSyntaxNameSuffix_ParsingError,
} from './ParsingError';

/** See [RFC 6838 Section 4.2.8](https://www.rfc-editor.org/rfc/rfc6838.html#section-4.2.8) for more information */
const StructuredSyntaxNameSuffix_allCases = [
  'xml',
  'json',
  'ber',
  'der',
  'fastinfoset',
  'wbxml',
  'zip',
  'gzip',
  'cbor',
  'json-seq',
  'cbor-seq',
] as const;

type StructuredSyntaxNameSuffix = (typeof StructuredSyntaxNameSuffix_allCases)[number];

const StructuredSyntaxNameSuffix_parsedFrom = (
  givenSubject: string,
): Attempt.Outcome<StructuredSyntaxNameSuffix, StructuredSyntaxNameSuffix_ParsingError> => Attempt.that((ends) => {
  const potentialStructuredSyntaxNameSuffix = StructuredSyntaxNameSuffix_allCases.find($0 => $0 === givenSubject);

  const newParsingError = new StructuredSyntaxNameSuffix_ParsingError(StructuredSyntaxNameSuffix_allCases);

  if (
    potentialStructuredSyntaxNameSuffix === undefined
  ) return ends.inFailureDueTo(newParsingError);

  return ends.inSuccessWith(potentialStructuredSyntaxNameSuffix);
});

const StructuredSyntaxNameSuffix_Nullable_parsedFrom = (
  givenSubject: string | null,
): Attempt.Outcome<StructuredSyntaxNameSuffix | null, StructuredSyntaxNameSuffix_ParsingError> => Attempt.that((ends) => {
  if (
    givenSubject === null
  ) return ends.inSuccessWith(null);

  return StructuredSyntaxNameSuffix_parsedFrom(givenSubject);
});

const StructuredSyntaxNameSuffix = {
  allCases: StructuredSyntaxNameSuffix_allCases,
  ...{
    parsedFrom: StructuredSyntaxNameSuffix_parsedFrom,
  },
  Nullable: {
    parsedFrom: StructuredSyntaxNameSuffix_Nullable_parsedFrom,
  },
};

export {
  StructuredSyntaxNameSuffix as default,
  StructuredSyntaxNameSuffix_ParsingError,
};
