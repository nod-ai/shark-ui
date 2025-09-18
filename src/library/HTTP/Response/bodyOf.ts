import type ContentDescriptor from '@/library/ContentDescriptor';

import {
  HTTP_Header,
} from '../Header';

import type {
  HTTP_Response_Body,
} from './Body';

const bodyOf = (
  givenResponse: Response,
): HTTP_Response_Body.Wrapped => ({
  isSuggestedToBeDigestibleAs(
    givenDescriptor: ContentDescriptor,
  ): boolean {
    const actualRawDescriptor = givenResponse.headers.get(HTTP_Header.Content.Descriptor);

    if (
      actualRawDescriptor === null
    ) return false;

    return actualRawDescriptor.includes(givenDescriptor.serialized.toString());
  },
});

export {
  bodyOf,
};
