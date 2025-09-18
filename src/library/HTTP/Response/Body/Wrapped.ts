import type ContentDescriptor from '@/library/ContentDescriptor';

interface HTTP_Response_Body_Wrapped {
  isSuggestedToBeDigestibleAs: (
    givenDescriptor: ContentDescriptor,
  ) => boolean;
}

export type {
  HTTP_Response_Body_Wrapped,
};
