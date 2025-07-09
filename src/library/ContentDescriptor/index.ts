import NonTrivialString from '@/library/customTypes/NonTrivialString';

import {
  concatenated,
} from '@/library/utilitiesByType/string';

import type {
  ContentDescriptor_StructuredSyntaxNameSuffix,
} from './StructuredSyntaxNameSuffix';

import type {
  ContentDescriptor_TopLevel,
} from './TopLevel';

/** See [RFC 2045](https://datatracker.ietf.org/doc/html/rfc2045) for more information */
class ContentDescriptor {
  public constructor(
    public fileType: ContentDescriptor_TopLevel.Any,
    public tree: string[] | null,
    public fileSubtype: string,
    public structureType: ContentDescriptor_StructuredSyntaxNameSuffix.Any | null,
    public parameters: Record<string, string> | null,
  ) {}

  public static readonly fileTypeSuffix = '/';

  public get serializableFileType(): NonTrivialString {
    const suffixedFileType = this.fileType.concat(ContentDescriptor.fileTypeSuffix);
    return NonTrivialString.parsedFrom(suffixedFileType).forciblyUnwrap(/* Proven safe by inspecting intellisense of `fileType` */);
  }

  public static readonly treeBranchSuffix = '.';

  private get serializableTree(): string | null {
    if (
      this.tree === null
    ) return null;

    const suffixedTreeBranches = this.tree.map($0 => $0.concat(ContentDescriptor.treeBranchSuffix));
    const serializedTreeBranches = concatenated(...suffixedTreeBranches);
    return serializedTreeBranches;
  }

  public static readonly structureTypePrefix = '+';

  private get serializableStructureType(): string | null {
    if (
      this.structureType === null
    ) return null;

    return ContentDescriptor.structureTypePrefix.concat(this.structureType);
  }

  public static readonly parameterPrefix = ';';
  public static readonly parameterKeyValueDelimiter = '=';

  private get serializableParameters(): string | null {
    if (
      this.parameters === null
    ) return null;

    const prefixedKeyValuePairs = Object.entries(this.parameters)
      .map($0 => $0.join(ContentDescriptor.parameterKeyValueDelimiter))
      .map($0 => ContentDescriptor.parameterPrefix.concat($0));

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

/**
 * A misnomer for {@link ContentDescriptor}.
 *
 * The intended connotation for "type" is "a string of characters that describes the nature of some content", which is more accurately described as a "descriptor"
 */
const ContentType = ContentDescriptor;
type ContentType = ContentDescriptor;

/**
 * A misnomer for {@link ContentDescriptor}.
 *
 * The intended connotation for "media" is "data formatted for client-side consumption", which is more accurately described as "content".
 *
 * This it at odds with the common definition of "media" that's most prevalent to this context which is "digital content available for human consumption (i.e. playback, viewing, reading, etc.)".
 */
const MediaType = ContentDescriptor;
type MediaType = ContentDescriptor;

/**
 * A misnomer for {@link ContentDescriptor}.
 *
 * "MIME" means "Multipurpose Internet Mail Extension", but that's no longer the only use-case for this standard.
 */
const MIMEType = ContentDescriptor;
type MIMEType = ContentDescriptor;

export {
  ContentDescriptor as default,
  ContentType,
  MediaType,
  MIMEType,
};
