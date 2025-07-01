import Attempt from '@/library/Attempt';

import type {
  ParsingError,
} from '@/library/Parser';

import type {
  StringParsable,
} from '@/library/Parser/string';

import NonTrivialString from '@/library/customTypes/NonTrivialString';

import type {
  StringForciblyParsable,
} from '@/library/typeUtilities/StringForciblyParsable';

import {
  isEmpty,
} from '@/library/utilitiesByType/array.ts';

import {
  concatenated,
} from '@/library/utilitiesByType/string';

import URI_ParsingError from './ParsingError';

/**
 * Identifies an abstract or physical resource.
 * See [RFC 3986](https://www.rfc-editor.org/rfc/rfc3986) for more information
 */
class UniformResourceIdentifier
implements StringParsable<
  typeof UniformResourceIdentifier
>, StringForciblyParsable<
  typeof UniformResourceIdentifier
> {
  private readonly _scheme: /*   */ NonTrivialString;
  private readonly _authority: /**/ NonTrivialString | null;
  private readonly _path: /*     */ NonTrivialString | null;
  private readonly _query: /*    */ NonTrivialString | null;
  private readonly _fragment: /* */ NonTrivialString | null;

  public constructor(
    givenScheme: /*   */ UniformResourceIdentifier['_scheme'],
    givenAuthority: /**/ UniformResourceIdentifier['_authority'] = null,
    givenPath: /*     */ UniformResourceIdentifier['_path'] = null,
    givenQuery: /*    */ UniformResourceIdentifier['_query'] = null,
    givenFragment: /* */ UniformResourceIdentifier['_fragment'] = null,
  ) {
    this._scheme /*   */ = givenScheme;
    this._authority /**/ = givenAuthority;
    this._path /*     */ = givenPath;
    this._query /*    */ = givenQuery;
    this._fragment /* */ = givenFragment;
  }

  public get scheme(): UniformResourceIdentifier['_scheme'] {
    return this._scheme;
  }

  public static readonly schemeSuffix = ':';

  public get serializableScheme(): string {
    return this.scheme.concat(UniformResourceIdentifier.schemeSuffix);
  }

  public static readonly authorityPrefix = '//';

  public get authority(): UniformResourceIdentifier['_authority'] {
    return this._authority;
  }

  private get serializableAuthority(): string | null {
    if (
      this.authority === null
    ) return null;

    return this.authority.prependedWith(UniformResourceIdentifier.authorityPrefix);
  }

  public get path(): Exclude<UniformResourceIdentifier['_path'], null> {
    if (
      this._path === null
    ) return Attempt.abandon('`path` must either be a) provided via constructor or b) overridden via public getter');

    return this._path;
  }

  public static readonly queryPrefix = '?';

  public get query(): UniformResourceIdentifier['_query'] {
    return this._query;
  }

  private get serializableQuery(): string | null {
    if (
      this.query === null
    ) return null;

    return this.query.prependedWith(UniformResourceIdentifier.queryPrefix);
  }

  public static readonly fragmentPrefix = '#';

  public get fragment(): UniformResourceIdentifier['_fragment'] {
    return this._fragment;
  }

  private get serializableFragment(): string | null {
    if (
      this.fragment === null
    ) return null;

    return this.fragment.prependedWith(UniformResourceIdentifier.fragmentPrefix);
  }

  public get serialized(): string {
    const orderedComponents = [
      this.serializableScheme,
      this.serializableAuthority,
      this.path,
      this.serializableQuery,
      this.serializableFragment,
    ];

    const serializedComponents = concatenated(...orderedComponents);
    return serializedComponents;
  }

  public static forciblyParsedFrom = (
    givenSubject: string,
  ): UniformResourceIdentifier => {
    return this.parsedFrom(givenSubject).forciblyUnwrap(/* TODO: distribute to callers */);
  };

  public static parsedFrom = (
    givenSubject: string,
  ): Attempt.Outcome<UniformResourceIdentifier, URI_ParsingError | ParsingError<string>> => Attempt.that((ends) => {
    const {
      schemeSuffix,
      authorityPrefix,
      queryPrefix,
      fragmentPrefix,
    } = UniformResourceIdentifier;

    const [
      rawScheme,
      componentsFollowingScheme,
      ...componentsFollowingUnexpectedSchemeSuffix
    ] = givenSubject.split(schemeSuffix);

    if (
      !isEmpty(componentsFollowingUnexpectedSchemeSuffix)
    ) return ends.inFailureDueTo(new URI_ParsingError(`Found components with extra scheme suffix: ${componentsFollowingUnexpectedSchemeSuffix.join()}`));

    if (
      rawScheme === undefined
    ) return ends.inFailureDueTo(new URI_ParsingError('Expected a scheme'));

    const outcomeOfParsingScheme = NonTrivialString.parsedFrom(rawScheme);

    if (
      outcomeOfParsingScheme.isFailure
    ) return outcomeOfParsingScheme.forciblyUnwrap(/* TODO: enable safe error propagation */);

    const parsedScheme = outcomeOfParsingScheme.unwrapped;

    const [
      componentsPrecedingFragment,
      rawFragment = null,
      ...unexpectedComponentsWithFragmentPrefix
    ] = componentsFollowingScheme?.split(fragmentPrefix) ?? [];

    if (
      !isEmpty(unexpectedComponentsWithFragmentPrefix)
    ) return ends.inFailureDueTo(new URI_ParsingError(`Found extra components with fragment prefix: ${unexpectedComponentsWithFragmentPrefix.join()}`));

    const outcomeOfParsingFragment = NonTrivialString.nullableParsedFrom(rawFragment);

    if (
      outcomeOfParsingFragment.isFailure
    ) return outcomeOfParsingFragment.forciblyUnwrap(/* TODO: enable safe error propagation */);

    const parsedFragment = outcomeOfParsingFragment.unwrapped;

    const [
      componentsPrecedingQuery,
      rawQuery = null,
      ...unexpectedComponentsWithQueryPrefix
    ] = componentsPrecedingFragment?.split(queryPrefix) ?? [];

    if (
      !isEmpty(unexpectedComponentsWithQueryPrefix)
    ) return ends.inFailureDueTo(new URI_ParsingError(`Found extra components with query prefix: ${unexpectedComponentsWithQueryPrefix.join()}`));

    const outcomeOfParsingQuery = NonTrivialString.nullableParsedFrom(rawQuery);

    if (
      outcomeOfParsingQuery.isFailure
    ) return outcomeOfParsingQuery.forciblyUnwrap(/* TODO: enable safe error propagation */);

    const parsedQuery = outcomeOfParsingQuery.unwrapped;

    if (
      componentsPrecedingQuery === undefined
    ) return ends.inFailureDueTo(new URI_ParsingError('Expected components preceding query'));

    const pathSegmentDelimiter = '/';

    type AuthorityAndPath =
      | {
        authority: null;
        path: string;
      }
      | {
        authority: string;
        path: `${typeof pathSegmentDelimiter}${string}`;
      };

    const outcomeOfSplittingAuthorityAndPath: Attempt.Outcome<AuthorityAndPath, URI_ParsingError> = Attempt.that((ends) => {
      if (
        !componentsPrecedingQuery.startsWith(authorityPrefix)
      ) return ends.inSuccessWith({
        authority: null,
        path     : componentsPrecedingQuery,
      });

      const authorityAndPath = componentsPrecedingQuery.replace(authorityPrefix, '');
      const [
        authority,
        ...pathSegments
      ] = authorityAndPath.split(pathSegmentDelimiter);

      if (
        authority === undefined
      ) return ends.inFailureDueTo(new URI_ParsingError('Expected to find authority between its prefix and the path segments'));

      return ends.inSuccessWith({
        authority,
        path: `${pathSegmentDelimiter}${pathSegments.join(pathSegmentDelimiter)}` as const,
      });
    });

    if (
      outcomeOfSplittingAuthorityAndPath.isFailure
    ) return outcomeOfSplittingAuthorityAndPath;

    const {
      authority: rawAuthority,
      path: rawPath,
    } = outcomeOfSplittingAuthorityAndPath.unwrapped;

    const outcomeOfParsingAuthority = NonTrivialString.nullableParsedFrom(rawAuthority);

    if (
      outcomeOfParsingAuthority.isFailure
    ) return outcomeOfParsingAuthority.forciblyUnwrap(/* TODO: enable safe error propagation */);

    const parsedAuthority = outcomeOfParsingAuthority.unwrapped;

    const outcomeOfParsingPath = NonTrivialString.parsedFrom(rawPath);

    if (
      outcomeOfParsingPath.isFailure
    ) return outcomeOfParsingPath.forciblyUnwrap(/* TODO: enable safe error propagation */);

    const parsedPath = outcomeOfParsingPath.unwrapped;

    const parsedURI = new UniformResourceIdentifier(
      parsedScheme,
      parsedAuthority,
      parsedPath,
      parsedQuery,
      parsedFragment,
    );

    return ends.inSuccessWith(parsedURI);
  });
}

export {
  UniformResourceIdentifier as default,
  URI_ParsingError,
};
