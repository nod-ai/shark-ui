import {
  Array,
  Option,
} from 'effect';

import type ContentDescriptor from '@/library/ContentDescriptor';
import NonTrivialString from '@/library/NonTrivialString';
import type Sequence from '@/library/Sequence';

import {
  concatenated,
} from '@/library/utilitiesByType/string';

import {
  URI,
} from '../definition.declared.ts';

import type {
  URI_Data_EncodingIdentifier,
} from './EncodingIdentifier';

/** See [RFC 2397](https://datatracker.ietf.org/doc/rfc2397) for more info */
class URI_Data
  extends URI {
  public static readonly scheme = NonTrivialString('data');

  public constructor(
    private readonly overridableDescriptor: Option.Option<ContentDescriptor>,
    public readonly encoding: URI_Data_EncodingIdentifier.Any,
    public readonly data: Sequence.Byte.Encoded.Base64,
  ) {
    super(
      URI_Data.scheme,
    );
  }

  public get descriptor(): Option.Option.Value<URI_Data['overridableDescriptor']> {
    return Option.getOrThrowWith(
      this.overridableDescriptor,
      () => new Error('Descriptor either needs to be initialized or overridden'),
    );
  }

  public static readonly encodingPrefix = ';';

  public get serializableEncoding(): Option.Option<string> {
    if (
      this.encoding !== 'base64'
    ) return Option.none();

    const prefixedEncoding = URI_Data.encodingPrefix.concat(this.encoding);
    return Option.some(prefixedEncoding);
  }

  public static readonly dataPrefix = ',';

  public get serializableData(): string {
    const prefixedData = URI_Data.dataPrefix.concat(this.data);
    return prefixedData;
  }

  public override get path(): NonTrivialString {
    const sparseOrderedPathComponents: Option.Option<string>[] = [
      Option.some(this.descriptor.serialized),
      /*       */ this.serializableEncoding,
      Option.some(this.serializableData),
    ];

    const orderedPathComponents = Array.getSomes(sparseOrderedPathComponents);
    const serializedPathComponents = concatenated(...orderedPathComponents);
    return NonTrivialString(serializedPathComponents);
  }
}

export {
  URI_Data,
};
