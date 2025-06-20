import type {
  StringForciblyParsable,
} from '@/library/typeUtilities/StringForciblyParsable';

import {
  isEmpty,
} from '@/library/utilitiesByType/array.ts';

import MediaType_ParsingError from './ParsingError';

const allFileTypes = [
  'application',
  'text',
  'image',
  'audio',
] as const;

type FileType = (typeof allFileTypes)[number];

/** See [RFC 6838 Section 4.2.8](https://www.rfc-editor.org/rfc/rfc6838.html#section-4.2.8) for more information */
const allStructuredSyntaxNameSuffix = [
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

type StructuredSyntaxNameSuffix = (typeof allStructuredSyntaxNameSuffix)[number];

/** See [RFC 2045](https://datatracker.ietf.org/doc/html/rfc2045) for more information */
class MediaType implements StringForciblyParsable<typeof MediaType> {
  public constructor(
    public fileType: FileType,
    public tree: string[] | null,
    public fileSubtype: string,
    public structureType: StructuredSyntaxNameSuffix | null,
    public parameters: Record<string, string> | null,
  ) {
    this.fileType = fileType;
    this.tree = tree;
    this.fileSubtype = fileSubtype;
    this.structureType = structureType;
    this.parameters = parameters;
  }

  public static readonly fileTypeSuffix = '/';

  public static readonly treeBranchSuffix = '.';

  private get suffixedTree(): string | null {
    if (
      this.tree === null
    ) return null;

    return this.tree
      .map($0 => $0 + MediaType.treeBranchSuffix)
      .join('');
  }

  public static readonly structureTypePrefix = '+';

  private get prefixedStructureType(): string | null {
    if (
      this.structureType === null
    ) return null;

    return MediaType.structureTypePrefix + this.structureType;
  }

  public static readonly parameterPrefix = ';';
  public static readonly parameterKeyValueDelimiter = '=';

  private get prefixedParameters(): string | null {
    if (
      this.parameters === null
    ) return null;

    return Object.entries(this.parameters)
      .map($0 => MediaType.parameterPrefix + $0.join(MediaType.parameterKeyValueDelimiter))
      .join('');
  }

  public toString(): string {
    const components = [
      this.fileType,
      MediaType.fileTypeSuffix,
      this.suffixedTree,
      this.fileSubtype,
      this.prefixedStructureType,
      this.prefixedParameters,
    ];

    return components.map($0 => $0 ?? '').join('');
  }

  public static forciblyParsedFrom = (
    givenSubject: string,
  ): MediaType => {
    const [
      rawFileType,
      remainderAfterFileType,
      ...componentsFollowingUnexpectedFileTypeSuffix
    ] = givenSubject.split(MediaType.fileTypeSuffix);

    if (
      !isEmpty(componentsFollowingUnexpectedFileTypeSuffix)
    ) return new MediaType_ParsingError(`Found component sets after extraneous file type suffix(es): ${componentsFollowingUnexpectedFileTypeSuffix.toString()}`).throwAnyway('To be converted to `Attempt` failure');

    const fileType = allFileTypes.find($0 => $0 === rawFileType);

    if (
      fileType === undefined
    ) return new MediaType_ParsingError(`Expected file type as one of ${allFileTypes.toString()}`).throwAnyway('To be converted to `Attempt` failure');

    const [
      remainderBeforeParameters,
      ...serializedParameters
    ] = remainderAfterFileType?.split(MediaType.parameterPrefix) ?? [];

    const parameterEntries = serializedParameters.map((eachParameter, indexOfEachParameter) => {
      const [
        keyOfEachParameter,
        valueOfEachParameter,
        ...extraneousComponentsInEachParameter
      ] = eachParameter.split(MediaType.parameterKeyValueDelimiter);

      if (
        !isEmpty(extraneousComponentsInEachParameter)
      ) return new MediaType_ParsingError(`Found extraneous components in parameter at index ${indexOfEachParameter.toString()}: ${extraneousComponentsInEachParameter.toString()}`).throwAnyway('To be converted to `Attempt` failure');

      if (
        keyOfEachParameter === undefined
      ) return new MediaType_ParsingError(`Expected key for parameter at index ${indexOfEachParameter.toString()}`).throwAnyway('To be converted to `Attempt` failure');

      if (
        valueOfEachParameter === undefined
      ) return new MediaType_ParsingError(`Expected value for parameter at index ${indexOfEachParameter.toString()}`).throwAnyway('To be converted to `Attempt` failure');

      return [
        keyOfEachParameter,
        valueOfEachParameter,
      ] as const;
    });

    const [
      serializedTreeBranchesEndingInFileSubtype,
      rawStructureType,
      ...extraComponentsWithStructureTypePrefix
    ] = remainderBeforeParameters?.split(MediaType.structureTypePrefix) ?? [];

    if (
      !isEmpty(extraComponentsWithStructureTypePrefix)
    ) return new MediaType_ParsingError(`Unexpected component sets after extraneous structure type prefix(es): ${extraComponentsWithStructureTypePrefix.toString()}`).throwAnyway('To be converted to `Attempt` failure');

    const structureType = (() => {
      if (
        rawStructureType === undefined
      ) return null;

      const potentialStructureType = allStructuredSyntaxNameSuffix.find($0 => $0 === rawStructureType);

      if (
        potentialStructureType === undefined
      ) return new MediaType_ParsingError(`Expected structure type as one of ${allStructuredSyntaxNameSuffix.toString()}`).throwAnyway('To be converted to `Attempt` failure');

      return potentialStructureType;
    })();

    if (
      serializedTreeBranchesEndingInFileSubtype === undefined
    ) return new MediaType_ParsingError('Expected file subtype').throwAnyway('To be converted to `Attempt` failure');

    const treeBranchesEndingInFileSubtype = serializedTreeBranchesEndingInFileSubtype.split(MediaType.treeBranchSuffix);
    const reversedTreeBranchesBeginningWithFileSubtype = treeBranchesEndingInFileSubtype.reverse();
    const fileSubtype = reversedTreeBranchesBeginningWithFileSubtype.shift();

    if (
      fileSubtype === undefined
    ) return new MediaType_ParsingError('Expected file subtype').throwAnyway('To be converted to `Attempt` failure');

    const tree = reversedTreeBranchesBeginningWithFileSubtype.reverse();

    return new MediaType(
      fileType,
      tree,
      fileSubtype,
      structureType,
      Object.fromEntries(parameterEntries),
    );
  };
}

export {
  MediaType as default,
  MediaType_ParsingError,
};
