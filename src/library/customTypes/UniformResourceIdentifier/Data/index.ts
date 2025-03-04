import type {
  Base64CharacterEncodedByteSequence,
} from '@/library/customTypes/Base64CharacterEncodedByteSequence.ts';

import UniformResourceIdentifier from '../index.ts';

import type MediaType from './MediaType.ts';

export type BinaryDataEncoding =
  | 'base64'
  | 'utf8';

/** See [RFC 2397](https://datatracker.ietf.org/doc/rfc2397) for more info */
export default class DataURI extends UniformResourceIdentifier {
  public static readonly scheme = 'data';
  public static readonly encodingPrefix = ';';
  public static readonly dataPrefix = `,`;

  constructor(
    mediaType: MediaType,
    encoding: BinaryDataEncoding,
    data: Base64CharacterEncodedByteSequence,
  ) {
    const components: string[] = [
      mediaType.toString(),
      DataURI.encodingPrefix,
      encoding,
      DataURI.dataPrefix,
      data,
    ];

    const derivedPath = components.join('');
    super(DataURI.scheme, null, derivedPath, null, null);
  }
}
