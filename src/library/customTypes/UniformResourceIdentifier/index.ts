import NonTrivialString from '@/library/customTypes/NonTrivialString.ts';

import {
  isEmpty,
} from '@/library/utilitiesByType/array.ts';

/**
 * Identifies an abstract or physical resource.
 * See [RFC 3986](https://www.rfc-editor.org/rfc/rfc3986) for more information
 */
export default class UniformResourceIdentifier {
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

  public get authority(): UniformResourceIdentifier['_authority'] {
    return this._authority;
  }

  public get path(): Exclude<UniformResourceIdentifier['_path'], null> {
    if (this._path === null) throw new Error('`path` must either be a) provided via constructor or b) overridden via public getter');

    return this._path;
  }

  public get query(): UniformResourceIdentifier['_query'] {
    return this._query;
  }

  public get fragment(): UniformResourceIdentifier['_fragment'] {
    return this._fragment;
  }

  public static readonly schemeSuffix = ':';

  public static readonly authorityPrefix = '//';

  private get prefixedAuthority(): string | null {
    if (this.authority === null) return null;

    return UniformResourceIdentifier.authorityPrefix + this.authority.toString();
  }

  public static readonly queryPrefix = '?';

  private get prefixedQuery(): string | null {
    if (this.query === null) return null;

    return UniformResourceIdentifier.queryPrefix + this.query.toString();
  }

  public static readonly fragmentPrefix = '#';

  private get prefixedFragment(): string | null {
    if (this.fragment === null) return null;

    return UniformResourceIdentifier.fragmentPrefix + this.fragment.toString();
  }

  public toString(): string {
    const components: (string | null | undefined)[] = [
      this.scheme.toString(),
      UniformResourceIdentifier.schemeSuffix,
      this.prefixedAuthority,
      this.path.toString(),
      this.prefixedQuery,
      this.prefixedFragment,
    ];

    return components.map($0 => $0 ?? '').join('');
  }

  public static tryToParse(givenSubject: string): UniformResourceIdentifier {
    const {
      schemeSuffix,
      authorityPrefix,
      queryPrefix,
      fragmentPrefix,
    } = UniformResourceIdentifier;

    const [
      scheme,
      componentsFollowingScheme,
      ...componentsFollowingUnexpectedSchemeSuffix
    ] = givenSubject.split(schemeSuffix);

    if (
      !isEmpty(componentsFollowingUnexpectedSchemeSuffix)
    ) throw new Error(`Found components with extra scheme suffix: ${componentsFollowingUnexpectedSchemeSuffix.join()}`);

    if (scheme === undefined) throw new Error('Expected a scheme');

    const [
      componentsPrecedingFragment,
      fragment,
      ...unexpectedComponentsWithFragmentPrefix
    ] = componentsFollowingScheme?.split(fragmentPrefix) ?? [];

    if (
      !isEmpty(unexpectedComponentsWithFragmentPrefix)
    ) throw new Error(`Found extra components with fragment prefix: ${unexpectedComponentsWithFragmentPrefix.join()}`);

    const [
      componentsPrecedingQuery,
      query,
      ...unexpectedComponentsWithQueryPrefix
    ] = componentsPrecedingFragment?.split(queryPrefix) ?? [];

    if (
      !isEmpty(unexpectedComponentsWithQueryPrefix)
    ) throw new Error(`Found extra components with query prefix: ${unexpectedComponentsWithQueryPrefix.join()}`);

    if (componentsPrecedingQuery === undefined) throw new Error('Expected components preceding query');

    const pathSegmentDelimiter = '/';

    const {
      authority,
      path,
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
      if (!componentsPrecedingQuery.startsWith(authorityPrefix)) {
        return ({
          authority: null,
          path     : componentsPrecedingQuery,
        });
      }

      const authorityAndPath = componentsPrecedingQuery.replace(authorityPrefix, '');
      const [
        authority,
        ...pathSegments
      ] = authorityAndPath.split(pathSegmentDelimiter);

      if (authority === undefined) throw new Error('Expected to find authority between its prefix and the path segments');

      return {
        authority,
        path: `${pathSegmentDelimiter}${pathSegments.join(pathSegmentDelimiter)}`,
      };
    })();

    return new UniformResourceIdentifier(
      NonTrivialString.tryToParseFrom(scheme),
      NonTrivialString.nullableParsedFrom(authority),
      NonTrivialString.tryToParseFrom(path),
      NonTrivialString.nullableParsedFrom(query ?? null),
      NonTrivialString.nullableParsedFrom(fragment ?? null),
    );
  }
}
