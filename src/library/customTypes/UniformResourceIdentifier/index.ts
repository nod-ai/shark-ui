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
  public readonly scheme: /*     */ NonTrivialString;
  public readonly authority: /*  */ NonTrivialString | null;
  private readonly overridablePath: NonTrivialString | null;
  private readonly _query: /*    */ NonTrivialString | null;
  private readonly _fragment: /* */ NonTrivialString | null;

  public constructor(
    givenScheme: /*   */ UniformResourceIdentifier['scheme'],
    givenAuthority: /**/ UniformResourceIdentifier['authority'] = null,
    givenPath: /*     */ UniformResourceIdentifier['overridablePath'] = null,
    givenQuery: /*    */ UniformResourceIdentifier['_query'] = null,
    givenFragment: /* */ UniformResourceIdentifier['_fragment'] = null,
  ) {
    this.scheme /*    */ = givenScheme;
    this.authority /* */ = givenAuthority;
    this.overridablePath = givenPath;
    this._query /*    */ = givenQuery;
    this._fragment /* */ = givenFragment;
  }

  public static readonly schemeSuffix = ':';

  public get serializableScheme(): string {
    return this.scheme.concat(UniformResourceIdentifier.schemeSuffix);
  }

  public static readonly authorityPrefix = '//';

  private get serializableAuthority(): string | null {
    if (
      this.authority === null
    ) return null;

    return this.authority.prependedWith(UniformResourceIdentifier.authorityPrefix);
  }

  public get path(): Exclude<UniformResourceIdentifier['overridablePath'], null> {
    if (
      this.overridablePath === null
    ) return Attempt.abandon('`path` must either be a) provided via constructor or b) overridden via public getter');

    return this.overridablePath;
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
