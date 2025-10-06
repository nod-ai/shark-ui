import Attempt from '@/library/Attempt';
import type DepNonTrivialString from '@/library/DepNonTrivialString';

import {
  concatenated,
} from '@/library/utilitiesByType/string';

/**
 * Uniform: is consistent and unambiguous
 *
 * Resource: can be physical or abstract
 *
 * Identifier: can be used to differentiate one from another
 *
 * See [RFC 3986](https://www.rfc-editor.org/rfc/rfc3986) for more information
 */
class URI {
  public constructor(
    public readonly scheme/*      */: DepNonTrivialString,
    public readonly authority/*   */: DepNonTrivialString | null = null,
    private readonly overridablePath: DepNonTrivialString | null = null,
    public readonly query/*       */: DepNonTrivialString | null = null,
    public readonly fragment/*    */: DepNonTrivialString | null = null,
  ) {}

  public static readonly schemeSuffix = ':';

  public get serializableScheme(): string {
    const suffixedScheme = this.scheme.concat(URI.schemeSuffix);
    return suffixedScheme;
  }

  public static readonly authorityPrefix = '//';

  private get serializableAuthority(): string | null {
    if (
      this.authority === null
    ) return null;

    const prefixedAuthority = this.authority.prependedWith(URI.authorityPrefix);
    return prefixedAuthority;
  }

  public get path(): Exclude<URI['overridablePath'], null> {
    if (
      this.overridablePath === null
    ) return Attempt.abandon('`path` must either be a) provided via constructor or b) overridden via public getter');

    return this.overridablePath;
  }

  public static readonly queryPrefix = '?';

  private get serializableQuery(): string | null {
    if (
      this.query === null
    ) return null;

    const prefixedQuery = this.query.prependedWith(URI.queryPrefix);
    return prefixedQuery;
  }

  public static readonly fragmentPrefix = '#';

  private get serializableFragment(): string | null {
    if (
      this.fragment === null
    ) return null;

    const prefixedFragment = this.fragment.prependedWith(URI.fragmentPrefix);
    return prefixedFragment;
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
  URI,
};
