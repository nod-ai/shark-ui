import {
  Option,
} from 'effect';

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
    public tree: Option.Option<string[]>,
    public bottomLevelDescriptor: string,
    public structureDescriptor: Option.Option<ContentDescriptor_StructuredSyntaxNameSuffix.Any>,
    public parameters: Option.Option<Record<string, string>>,
  ) {}

  public static readonly suffixForTopLevelDescriptor = '/';

  public get serializableTopLevelDescriptor(): NonTrivialString {
    const suffixedTopLevelDescriptor = this.topLevelDescriptor.concat(ContentDescriptor.suffixForTopLevelDescriptor);
    const coercedTopLevelDescriptor = NonTrivialString(suffixedTopLevelDescriptor);
    return coercedTopLevelDescriptor;
  }

  public static readonly treeBranchSuffix = '.';

  private readonly serializableTree = Option.gen(this, function* () {
    const suffixedTreeBranches = (yield* this.tree).map(($0) => $0.concat(ContentDescriptor.treeBranchSuffix));
    const serializedTreeBranches = concatenated(...suffixedTreeBranches);
    return serializedTreeBranches;
  });

  public static readonly structureDescriptorPrefix = '+';

  private readonly serializableStructureDescriptor = Option.gen(this, function* () {
    return ContentDescriptor.structureDescriptorPrefix.concat(yield* this.structureDescriptor);
  });

  public static readonly parameterPrefix = ';';
  public static readonly parameterKeyValueDelimiter = '=';

  private readonly serializableParameters = Option.gen(this, function* () {
    const serializableParameterEntries = Object.entries(yield* this.parameters)
      .map(($0) => $0.join(ContentDescriptor.parameterKeyValueDelimiter))
      .map(($0) => ContentDescriptor.parameterPrefix.concat($0));

    return concatenated(...serializableParameterEntries);
  });

  public get serialized(): NonTrivialString {
    const orderedComponents = [
      this.serializableTopLevelDescriptor,
      this.serializableTree,
      this.bottomLevelDescriptor,
      this.serializableStructureDescriptor,
      this.serializableParameters,
    ];

    const serializedComponents = concatenated(...orderedComponents);
    return NonTrivialString(serializedComponents);
  }
}

export {
  ContentDescriptor,
};
