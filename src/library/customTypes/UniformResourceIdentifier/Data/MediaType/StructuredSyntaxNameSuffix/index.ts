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
) => {
  return {
    forciblyUnwrap: () => {
      const potentialStructureType = StructuredSyntaxNameSuffix_allCases.find($0 => $0 === givenSubject);

      if (
        potentialStructureType === undefined
      ) return new StructuredSyntaxNameSuffix_ParsingError(StructuredSyntaxNameSuffix_allCases).throwAnyway('To be converted to `Attempt` failure');

      return potentialStructureType;
    },
  };
};

const StructuredSyntaxNameSuffix_Nullable_parsedFrom = (
  givenSubject: string | null,
) => {
  return {
    forciblyUnwrap: () => {
      if (
        givenSubject === null
      ) return null;

      return StructuredSyntaxNameSuffix_parsedFrom(givenSubject).forciblyUnwrap();
    },
  };
};

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
