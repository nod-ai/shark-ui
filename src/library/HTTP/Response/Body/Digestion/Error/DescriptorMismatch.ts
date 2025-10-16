import {
  Data,
} from 'effect';

import type ContentDescriptor from '@/library/ContentDescriptor';

import {
  HTTP_Header,
} from '@/library/HTTP/Header'; // eslint-disable-line import/no-internal-modules -- avoids long relative path

class HTTP_Response_Body_Digestion_Error_DescriptorMismatch
  extends Data.TaggedError(
    'HTTP_Response_Body_Digestion_Error_DescriptorMismatch',
  )<{
    response: Response;
    expectedDescriptor: ContentDescriptor;
  }> {
  public override get message(): string {
    const /**/expectedRawDescriptor = this.expectedDescriptor.serialized.toString();
    const /*  */actualRawDescriptor = this.response.headers.get(HTTP_Header.Content.Descriptor) ?? '';

    return `Expected content descriptor to be "${expectedRawDescriptor}", but it was actually "${actualRawDescriptor}"`;
  }
}

export {
  HTTP_Response_Body_Digestion_Error_DescriptorMismatch,
};
