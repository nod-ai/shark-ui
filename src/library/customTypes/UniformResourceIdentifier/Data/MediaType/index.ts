import NonTrivialString from '@/library/customTypes/NonTrivialString';

import {
  concatenated,
} from '@/library/utilitiesByType/string';

import type StructuredSyntaxNameSuffix from './StructuredSyntaxNameSuffix';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const allFileTypes = [
  'application',
  'text',
  'image',
  'audio',
] as const;

type FileType = (typeof allFileTypes)[number];

/** See [RFC 2045](https://datatracker.ietf.org/doc/html/rfc2045) for more information */
class MediaType {
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

  public get serializableFileType(): NonTrivialString {
    const suffixedFileType = this.fileType.concat(MediaType.fileTypeSuffix);
    return NonTrivialString.parsedFrom(suffixedFileType).forciblyUnwrap(/* Proven safe by inspecting intellisense of `fileType` */);
  }

  public static readonly treeBranchSuffix = '.';

  private get serializableTree(): string | null {
    if (
      this.tree === null
    ) return null;

    const suffixedTreeBranches = this.tree.map($0 => $0.concat(MediaType.treeBranchSuffix));
    const serializedTreeBranches = concatenated(...suffixedTreeBranches);
    return serializedTreeBranches;
  }

  public static readonly structureTypePrefix = '+';

  private get serializableStructureType(): string | null {
    if (
      this.structureType === null
    ) return null;

    return MediaType.structureTypePrefix.concat(this.structureType);
  }

  public static readonly parameterPrefix = ';';
  public static readonly parameterKeyValueDelimiter = '=';

  private get serializableParameters(): string | null {
    if (
      this.parameters === null
    ) return null;

    const prefixedKeyValuePairs = Object.entries(this.parameters)
      .map($0 => $0.join(MediaType.parameterKeyValueDelimiter))
      .map($0 => MediaType.parameterPrefix.concat($0));

    const serializedKeyValuePairs = concatenated(...prefixedKeyValuePairs);
    return serializedKeyValuePairs;
  }

  public get serialized(): NonTrivialString {
    const orderedComponents = [
      this.serializableFileType,
      this.serializableTree,
      this.fileSubtype,
      this.serializableStructureType,
      this.serializableParameters,
    ] as const;

    const serializedComponents = NonTrivialString.fromConcatenating(...orderedComponents);
    return serializedComponents;
  }
}

export {
  MediaType as default,
};
