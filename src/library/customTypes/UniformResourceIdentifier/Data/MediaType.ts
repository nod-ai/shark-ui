import {
  isEmpty,
} from '@/library/utilitiesByType/array.ts';

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
export default class MediaType {
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
    if (this.tree === null) return null;

    return this.tree
      .map($0 => $0 + MediaType.treeBranchSuffix)
      .join('');
  }

  public static readonly structureTypePrefix = '+';

  private get prefixedStructureType(): string | null {
    if (this.structureType === null) return null;

    return MediaType.structureTypePrefix + this.structureType;
  }

  public static readonly parameterPrefix = ';';
  public static readonly parameterKeyValueDelimiter = '=';

  private get prefixedParameters(): string | null {
    if (this.parameters === null) return null;

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

  public static tryToParse(givenSubject: string): MediaType {
    const [
      rawFileType,
      remainderAfterFileType,
      ...componentsFollowingUnexpectedFileTypeSuffix
    ] = givenSubject.split(MediaType.fileTypeSuffix);

    if (
      !isEmpty(componentsFollowingUnexpectedFileTypeSuffix)
    ) throw new Error(`Found component sets after extraneous file type suffix(es): ${componentsFollowingUnexpectedFileTypeSuffix.toString()}`);

    const fileType = allFileTypes.find($0 => $0 === rawFileType);

    if (fileType === undefined) throw new Error(`Expected file type as one of ${allFileTypes.toString()}`);

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
      ) throw new Error(`Found extraneous components in parameter at index ${indexOfEachParameter.toString()}: ${extraneousComponentsInEachParameter.toString()}`);

      if (
        keyOfEachParameter === undefined
      ) throw new Error(`Expected key for parameter at index ${indexOfEachParameter.toString()}`);

      if (
        valueOfEachParameter === undefined
      ) throw new Error(`Expected value for parameter at index ${indexOfEachParameter.toString()}`);

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
    ) throw new Error(`Unexpected component sets after extraneous structure type prefix(es): ${extraComponentsWithStructureTypePrefix.toString()}`);

    const structureType = (() => {
      if (rawStructureType === undefined) return null;

      const potentialStructureType = allStructuredSyntaxNameSuffix.find($0 => $0 === rawStructureType);

      if (
        potentialStructureType === undefined
      ) throw new Error(`Expected structure type as one of ${allStructuredSyntaxNameSuffix.toString()}`);

      return potentialStructureType;
    })();

    if (
      serializedTreeBranchesEndingInFileSubtype === undefined
    ) throw new Error('Expected file subtype');

    const treeBranchesEndingInFileSubtype = serializedTreeBranchesEndingInFileSubtype.split(MediaType.treeBranchSuffix);
    const reversedTreeBranchesBeginningWithFileSubtype = treeBranchesEndingInFileSubtype.reverse();
    const fileSubtype = reversedTreeBranchesBeginningWithFileSubtype.shift();

    if (fileSubtype === undefined) throw new Error('Expected file subtype');

    const tree = reversedTreeBranchesBeginningWithFileSubtype.reverse();

    return new MediaType(
      fileType,
      tree,
      fileSubtype,
      structureType,
      Object.fromEntries(parameterEntries),
    );
  }
}
