import NonTrivialString from '@/library/NonTrivialString';

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
    public topLevelDescriptor: ContentDescriptor_TopLevel.Any,
    public tree: string[] | null,
    public bottomLevelDescriptor: string,
    public structureDescriptor: ContentDescriptor_StructuredSyntaxNameSuffix.Any | null,
    public parameters: Record<string, string> | null,
  ) {}

  public static readonly suffixForTopLevelDescriptor = '/';

  public get serializableTopLevelDescriptor(): NonTrivialString {
    const suffixedTopLevelDescriptor = this.topLevelDescriptor.concat(ContentDescriptor.suffixForTopLevelDescriptor);
    return NonTrivialString.parsedFrom(suffixedTopLevelDescriptor).forciblyUnwrap(/* Proven safe by inspecting intellisense of `topLevelDescriptor` */);
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

  public static readonly structureDescriptorPrefix = '+';

  private get serializableStructureDescriptor(): string | null {
    if (
      this.structureDescriptor === null
    ) return null;

    return ContentDescriptor.structureDescriptorPrefix.concat(this.structureDescriptor);
  }

  public static readonly parameterPrefix = ';';
  public static readonly parameterKeyValueDelimiter = '=';

  private get serializableParameters(): string | null {
    if (
      this.parameters === null
    ) return null;

    const serializableParameterEntries = Object.entries(this.parameters)
      .map($0 => $0.join(ContentDescriptor.parameterKeyValueDelimiter))
      .map($0 => ContentDescriptor.parameterPrefix.concat($0));

    return concatenated(...serializableParameterEntries);
  }

  public get serialized(): NonTrivialString {
    const orderedComponents = [
      this.serializableTopLevelDescriptor,
      this.serializableTree,
      this.bottomLevelDescriptor,
      this.serializableStructureDescriptor,
      this.serializableParameters,
    ] as const;

    const serializedComponents = NonTrivialString.fromConcatenating(...orderedComponents);
    return serializedComponents;
  }
}

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
  ContentDescriptor,
  MediaType,
  MIMEType,
};
