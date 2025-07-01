import Attempt from '@/library/Attempt';
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
implements StringForciblyParsable<
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
    ) return new URI_ParsingError(`Found components with extra scheme suffix: ${componentsFollowingUnexpectedSchemeSuffix.join()}`).throwAnyway('To be converted to `Attempt` failure');

    if (
      rawScheme === undefined
    ) return new URI_ParsingError('Expected a scheme').throwAnyway('To be converted to `Attempt` failure');

    const outcomeOfParsingScheme = NonTrivialString.parsedFrom(rawScheme);
    const parsedScheme = outcomeOfParsingScheme.forciblyUnwrap(/* TODO: make adjacent to `return` statement */);

    const [
      componentsPrecedingFragment,
      rawFragment = null,
      ...unexpectedComponentsWithFragmentPrefix
    ] = componentsFollowingScheme?.split(fragmentPrefix) ?? [];

    if (
      !isEmpty(unexpectedComponentsWithFragmentPrefix)
    ) return new URI_ParsingError(`Found extra components with fragment prefix: ${unexpectedComponentsWithFragmentPrefix.join()}`).throwAnyway('To be converted to `Attempt` failure');

    const outcomeOfParsingFragment = NonTrivialString.nullableParsedFrom(rawFragment);
    const parsedFragment = outcomeOfParsingFragment.forciblyUnwrap(/* TODO: make adjacent to `return` statement */);

    const [
      componentsPrecedingQuery,
      rawQuery = null,
      ...unexpectedComponentsWithQueryPrefix
    ] = componentsPrecedingFragment?.split(queryPrefix) ?? [];

    if (
      !isEmpty(unexpectedComponentsWithQueryPrefix)
    ) return new URI_ParsingError(`Found extra components with query prefix: ${unexpectedComponentsWithQueryPrefix.join()}`).throwAnyway('To be converted to `Attempt` failure');

    const parsedQuery = NonTrivialString.nullableParsedFrom(rawQuery).forciblyUnwrap(/* TODO: make adjacent to `return` statement */);

    if (
      componentsPrecedingQuery === undefined
    ) return new URI_ParsingError('Expected components preceding query').throwAnyway('To be converted to `Attempt` failure');

    const pathSegmentDelimiter = '/';

    const {
      authority: rawAuthority,
      path: rawPath,
    } = ((): (
      | {
        authority: null;
        path: string;
      }
      | {
        authority: string;
        path: `${typeof pathSegmentDelimiter}${string}`;
      }
    ) => {
      if (
        !componentsPrecedingQuery.startsWith(authorityPrefix)
      ) return ({
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
      ) return new URI_ParsingError('Expected to find authority between its prefix and the path segments').throwAnyway('To be converted to `Attempt` failure');

      return {
        authority,
        path: `${pathSegmentDelimiter}${pathSegments.join(pathSegmentDelimiter)}`,
      };
    })();

    const parsedAuthority = NonTrivialString.nullableParsedFrom(rawAuthority).forciblyUnwrap(/* TODO: make adjacent to `return` statement */);
    const parsedPath = NonTrivialString.parsedFrom(rawPath).forciblyUnwrap(/* TODO: make adjacent to `return` statement */);

    return new UniformResourceIdentifier(
      parsedScheme,
      parsedAuthority,
      parsedPath,
      parsedQuery,
      parsedFragment,
    );
  };
}

export {
  UniformResourceIdentifier as default,
  URI_ParsingError,
};
