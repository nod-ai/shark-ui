import {
  Option,
} from 'effect';

import type NonTrivialString from '@/library/NonTrivialString';

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
    public readonly scheme/*      */: /*         */ NonTrivialString,
    public readonly authority/*   */: Option.Option<NonTrivialString> = Option.none(),
    private readonly overridablePath: Option.Option<NonTrivialString> = Option.none(),
    public readonly query/*       */: Option.Option<NonTrivialString> = Option.none(),
    public readonly fragment/*    */: Option.Option<NonTrivialString> = Option.none(),
  ) {}

  public static readonly schemeSuffix = ':';

  public get serializableScheme(): string {
    const suffixedScheme = this.scheme.concat(URI.schemeSuffix);
    return suffixedScheme;
  }

  public static readonly authorityPrefix = '//';

  private get serializableAuthority(): Option.Option<string> {
    return Option.map(
      this.authority,
      ($0) => URI.authorityPrefix.concat($0),
    );
  }

  public get path(): Option.Option.Value<URI['overridablePath']> {
    return Option.getOrThrowWith(
      this.overridablePath,
      () => new Error('`path` must either be a) provided via constructor or b) overridden via public getter'),
    );
  }

  public static readonly queryPrefix = '?';

  private get serializableQuery(): Option.Option<string> {
    return Option.map(
      this.query,
      ($0) => URI.queryPrefix.concat($0),
    );
  }

  public static readonly fragmentPrefix = '#';

  private get serializableFragment(): Option.Option<string> {
    return Option.map(
      this.fragment,
      ($0) => URI.fragmentPrefix.concat($0),
    );
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
