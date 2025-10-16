import Attempt from '@/library/Attempt';
import type ContentDescriptor from '@/library/ContentDescriptor';

import {
  HTTP_Header,
} from '@/library/HTTP/Header'; // eslint-disable-line import/no-internal-modules -- avoids long relative path

class HTTP_Response_Body_Digestion_Error_DescriptorMismatch
  extends Attempt.Error.Tagged(
    'HTTP_Response_Body_Digestion_Error_DescriptorMismatch',
  ) {
  public constructor(
    public readonly response: Response,
    public readonly expectedDescriptor: ContentDescriptor,
  ) {
    const /**/expectedRawDescriptor = expectedDescriptor.serialized.toString();
    const /*  */actualRawDescriptor = response.headers.get(HTTP_Header.Content.Descriptor) ?? '';

    super({
      message: `Expected content descriptor to be "${expectedRawDescriptor}", but it was actually "${actualRawDescriptor}"`,
    });
  }
}

export {
  HTTP_Response_Body_Digestion_Error_DescriptorMismatch,
};
