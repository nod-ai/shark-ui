import Attempt from '@/library/Attempt';
import type NonTrivialString from '@/library/NonTrivialString';

import {
  concatenated,
} from '@/library/utilitiesByType/string';

/**
 * Identifies an abstract or physical resource.
 * See [RFC 3986](https://www.rfc-editor.org/rfc/rfc3986) for more information
 */
class UniformResourceIdentifier {
  public constructor(
    public readonly scheme/*      */: NonTrivialString,
    public readonly authority/*   */: NonTrivialString | null = null,
    private readonly overridablePath: NonTrivialString | null = null,
    public readonly query/*       */: NonTrivialString | null = null,
    public readonly fragment/*    */: NonTrivialString | null = null,
  ) {}

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

  private get serializableQuery(): string | null {
    if (
      this.query === null
    ) return null;

    return this.query.prependedWith(UniformResourceIdentifier.queryPrefix);
  }

  public static readonly fragmentPrefix = '#';

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
  UniformResourceIdentifier,
};
