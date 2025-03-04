type FileType =
  | 'application'
  | 'text'
  | 'image'
  | 'audio';

/** See [RFC 6838 Section 4.2.8](https://www.rfc-editor.org/rfc/rfc6838.html#section-4.2.8) for more information */
type StructuredSyntaxNameSuffix =
  | 'xml'
  | 'json'
  | 'ber'
  | 'der'
  | 'fastinfoset'
  | 'wbxml'
  | 'zip'
  | 'gzip'
  | 'cbor'
  | 'json-seq'
  | 'cbor-seq';

/** See [RFC 2045](https://datatracker.ietf.org/doc/html/rfc2045) for more information */
export default class MediaType {
  constructor(
    public fileType: FileType,
    public trees: string[] | null,
    public fileSubtype: string,
    public structureType: StructuredSyntaxNameSuffix | null,
    public parameters: Record<string, string> | null,
  ) {
    this.fileType = fileType;
    this.trees = trees;
    this.fileSubtype = fileSubtype;
    this.structureType = structureType;
    this.parameters = parameters;
  }

  public static readonly fileTypeSuffix = '/';

  public static readonly treeSuffix = '.';

  private get suffixedTrees(): string | null {
    if (this.trees === null) return null;

    return this.trees
      .map($0 => $0 + MediaType.treeSuffix)
      .join('');
  }

  public static readonly structureTypeSuffix = '+';

  private get prefixedStructureType(): string | null {
    if (this.structureType === null) return null;

    return MediaType.structureTypeSuffix + this.structureType;
  }

  public static readonly parameterSuffix = ';';
  public static readonly parameterKeyValueDelimiter = '=';

  private get prefixedParameters(): string | null {
    if (this.parameters === null) return null;

    return Object.entries(this.parameters)
      .map($0 => MediaType.parameterSuffix + $0.join(MediaType.parameterKeyValueDelimiter))
      .join('');
  }

  public toString(): string {
    const components = [
      this.fileType,
      MediaType.fileTypeSuffix,
      this.suffixedTrees,
      this.fileSubtype,
      this.prefixedStructureType,
      this.prefixedParameters,
    ];

    return components.map($0 => $0 ?? '').join('');
  }
}
