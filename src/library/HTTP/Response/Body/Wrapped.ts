import type {
  Exit,
} from 'effect';

import type ContentDescriptor from '@/library/ContentDescriptor';

import type {
  HTTP_Response_Body_Digestion,
} from './Digestion';

interface HTTP_Response_Body_Wrapped {
  isSuggestedToBeDigestibleAs: (
    givenDescriptor: ContentDescriptor,
  ) => boolean;

  digestAsUnknown: () => Promise<
    Exit.Exit<
      unknown,
      HTTP_Response_Body_Digestion.Error.Any
    >
  >;
}

export type {
  HTTP_Response_Body_Wrapped,
};
