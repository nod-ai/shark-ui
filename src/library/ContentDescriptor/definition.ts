import NonTrivialString from '@/library/NonTrivialString';

import {
  concatenated,
} from '@/library/utilitiesByType/string/concatenated';

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
    const coercedTopLevelDescriptor = NonTrivialString.parsedFrom(suffixedTopLevelDescriptor).forciblyUnwrap(/* Proven safe by inspecting intellisense of `topLevelDescriptor` */);
    return coercedTopLevelDescriptor;
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

    const prefixedStructureDescriptor = ContentDescriptor.structureDescriptorPrefix.concat(this.structureDescriptor);
    return prefixedStructureDescriptor;
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

export {
  ContentDescriptor,
};
