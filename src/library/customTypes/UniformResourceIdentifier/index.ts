import Attempt from '@/library/Attempt';
import type NonTrivialString from '@/library/customTypes/NonTrivialString';

import {
  concatenated,
} from '@/library/utilitiesByType/string';

/**
 * Identifies an abstract or physical resource.
 * See [RFC 3986](https://www.rfc-editor.org/rfc/rfc3986) for more information
 */
class UniformResourceIdentifier {
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
}

export {
  UniformResourceIdentifier as default,
};
