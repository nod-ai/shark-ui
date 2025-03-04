/**
 * Identifies an abstract or physical resource.
 * See [RFC 3986](https://www.rfc-editor.org/rfc/rfc3986) for more information
 */
export default class UniformResourceIdentifier {
  constructor(
    public readonly scheme: string,
    public readonly authority: string | null,
    public readonly path: string,
    public readonly query: string | null,
    public readonly fragment: string | null,
  ) {
    this.scheme = scheme;
    this.authority = authority;
    this.path = path;
    this.query = query;
    this.fragment = fragment;
  }

  public static readonly schemeSuffix = ':';

  public static readonly authorityPrefix = '//';

  private get prefixedAuthority(): string | null {
    if (this.authority === null) return null;

    return UniformResourceIdentifier.authorityPrefix + this.authority;
  }

  public static readonly queryPrefix = '?';

  private get prefixedQuery(): string | null {
    if (this.query === null) return null;

    return UniformResourceIdentifier.queryPrefix + this.query;
  }

  public static readonly fragmentPrefix = '#';

  private get prefixedFragment(): string | null {
    if (this.fragment === null) return null;

    return UniformResourceIdentifier.fragmentPrefix + this.fragment;
  }

  public toString(): string {
    const components = [
      this.scheme,
      UniformResourceIdentifier.schemeSuffix,
      this.prefixedAuthority,
      this.path,
      this.prefixedQuery,
      this.prefixedFragment,
    ];

    return components.map($0 => $0 ?? '').join('');
  }
}
