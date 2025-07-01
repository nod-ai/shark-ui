import Attempt from '@/library/Attempt';

import type {
  StringParsable,
} from '@/library/Parser/string';

import NonTrivialString from '@/library/customTypes/NonTrivialString';

import {
  isEmpty,
} from '@/library/utilitiesByType/array.ts';

import {
  concatenated,
} from '@/library/utilitiesByType/string';

import MediaType_ParsingError from './ParsingError';

import StructuredSyntaxNameSuffix, {
  type StructuredSyntaxNameSuffix_ParsingError,
} from './StructuredSyntaxNameSuffix';

const allFileTypes = [
  'application',
  'text',
  'image',
  'audio',
] as const;

type FileType = (typeof allFileTypes)[number];

type MediaType_EffectiveParsingError =
  | MediaType_ParsingError
  | StructuredSyntaxNameSuffix_ParsingError;

/** See [RFC 2045](https://datatracker.ietf.org/doc/html/rfc2045) for more information */
class MediaType
implements StringParsable<
  typeof MediaType
> {
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

  public static parsedFrom = (
    givenSubject: string,
  ): Attempt.Outcome<MediaType, MediaType_EffectiveParsingError> => Attempt.that((ends) => {
    const [
      rawFileType,
      remainderAfterFileType,
      ...componentsFollowingUnexpectedFileTypeSuffix
    ] = givenSubject.split(MediaType.fileTypeSuffix);

    if (
      !isEmpty(componentsFollowingUnexpectedFileTypeSuffix)
    ) return ends.inFailureDueTo(new MediaType_ParsingError(`Found component sets after extraneous file type suffix(es): ${componentsFollowingUnexpectedFileTypeSuffix.toString()}`));

    const parsedFileType = allFileTypes.find($0 => $0 === rawFileType);

    if (
      parsedFileType === undefined
    ) return ends.inFailureDueTo(new MediaType_ParsingError(`Expected file type as one of ${allFileTypes.toString()}`));

    const [
      remainderBeforeParameters,
      ...serializedParameters
    ] = remainderAfterFileType?.split(MediaType.parameterPrefix) ?? [];

    type MediaType_ParameterEntry = [string, string];

    const outcomesOfSerializingParameters = serializedParameters.map((eachParameter, indexOfEachParameter): Attempt.Outcome<MediaType_ParameterEntry, MediaType_ParsingError> => Attempt.that((ends) => {
      const [
        keyOfEachParameter,
        valueOfEachParameter,
        ...extraneousComponentsInEachParameter
      ] = eachParameter.split(MediaType.parameterKeyValueDelimiter);

      if (
        !isEmpty(extraneousComponentsInEachParameter)
      ) return ends.inFailureDueTo(new MediaType_ParsingError(`Found extraneous components in parameter at index ${indexOfEachParameter.toString()}: ${extraneousComponentsInEachParameter.toString()}`));

      if (
        keyOfEachParameter === undefined
      ) return ends.inFailureDueTo(new MediaType_ParsingError(`Expected key for parameter at index ${indexOfEachParameter.toString()}`));

      if (
        valueOfEachParameter === undefined
      ) return ends.inFailureDueTo(new MediaType_ParsingError(`Expected value for parameter at index ${indexOfEachParameter.toString()}`));

      const entryForEachParameter: MediaType_ParameterEntry = [
        keyOfEachParameter,
        valueOfEachParameter,
      ];

      return ends.inSuccessWith(entryForEachParameter);
    }));

    const parameterEntries: MediaType_ParameterEntry[] = [];

    for (const eachOutcome of outcomesOfSerializingParameters) {
      if (
        eachOutcome.isFailure
      ) return eachOutcome;

      parameterEntries.push(eachOutcome.unwrapped);
    }

    const parsedParametersByKey = Object.fromEntries(parameterEntries);

    const [
      serializedTreeBranchesEndingInFileSubtype,
      rawStructureType = null,
      ...extraComponentsWithStructureTypePrefix
    ] = remainderBeforeParameters?.split(MediaType.structureTypePrefix) ?? [];

    if (
      !isEmpty(extraComponentsWithStructureTypePrefix)
    ) return ends.inFailureDueTo(new MediaType_ParsingError(`Unexpected component sets after extraneous structure type prefix(es): ${extraComponentsWithStructureTypePrefix.toString()}`));

    const outcomeOfParsingStructureType = StructuredSyntaxNameSuffix.Nullable.parsedFrom(rawStructureType);

    if (
      outcomeOfParsingStructureType.isFailure
    ) return outcomeOfParsingStructureType;

    const parsedStructureType = outcomeOfParsingStructureType.unwrapped;

    if (
      serializedTreeBranchesEndingInFileSubtype === undefined
    ) return ends.inFailureDueTo(new MediaType_ParsingError('Expected file subtype'));

    const treeBranchesEndingInFileSubtype = serializedTreeBranchesEndingInFileSubtype.split(MediaType.treeBranchSuffix);
    const reversedTreeBranchesBeginningWithFileSubtype = treeBranchesEndingInFileSubtype.reverse();
    const parsedFileSubtype = reversedTreeBranchesBeginningWithFileSubtype.shift();

    if (
      parsedFileSubtype === undefined
    ) return ends.inFailureDueTo(new MediaType_ParsingError('Expected file subtype'));

    const parsedTree = reversedTreeBranchesBeginningWithFileSubtype.reverse();

    const parsedMediaType = new MediaType(
      parsedFileType,
      parsedTree,
      parsedFileSubtype,
      parsedStructureType,
      parsedParametersByKey,
    );

    return ends.inSuccessWith(parsedMediaType);
  });
}

export {
  MediaType as default,
  MediaType_ParsingError,
};
