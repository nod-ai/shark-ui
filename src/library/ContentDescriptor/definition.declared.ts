import {
  Array,
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

  private get serializableTree(): Option.Option<string> {
    return Option.map(
      this.tree,
      ($0) => {
        const suffixedTreeBranches = $0.map($0 => $0.concat(ContentDescriptor.treeBranchSuffix));
        const serializedTreeBranches = concatenated(...suffixedTreeBranches);
        return serializedTreeBranches;
      },
    );
  }

  public static readonly structureDescriptorPrefix = '+';

  private get serializableStructureDescriptor(): Option.Option<string> {
    return Option.map(
      this.structureDescriptor,
      $0 => ContentDescriptor.structureDescriptorPrefix.concat($0),
    );
  }

  public static readonly parameterPrefix = ';';
  public static readonly parameterKeyValueDelimiter = '=';

  private get serializableParameters(): Option.Option<string> {
    return Option.map(
      this.parameters,
      ($0) => {
        const serializableParameterEntries = Object.entries($0)
          .map($0 => $0.join(ContentDescriptor.parameterKeyValueDelimiter))
          .map($0 => ContentDescriptor.parameterPrefix.concat($0));

        return concatenated(...serializableParameterEntries);
      },
    );
  }

  public get serialized(): NonTrivialString {
    const sparseOrderedComponents: Option.Option<string>[] = [
      Option.some(this.serializableTopLevelDescriptor),
      /*       */ this.serializableTree,
      Option.some(this.bottomLevelDescriptor),
      /*       */ this.serializableStructureDescriptor,
      /*       */ this.serializableParameters,
    ];

    const orderedComponents = Array.getSomes(sparseOrderedComponents);
    const serializedComponents = concatenated(...orderedComponents);
    return NonTrivialString(serializedComponents);
  }
}

export {
  ContentDescriptor,
};
