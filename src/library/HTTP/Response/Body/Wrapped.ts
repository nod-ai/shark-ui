import type {
  Effect,
} from 'effect';

import type ContentDescriptor from '@/library/ContentDescriptor';

import type {
  HTTP_Response_Body_Digestion,
} from './Digestion';

interface HTTP_Response_Body_Wrapped {
  isSuggestedToBeDigestibleAs: (
    givenDescriptor: ContentDescriptor,
  ) => boolean;

  readonly digestAsUnknown: Effect.Effect<
    unknown,
    HTTP_Response_Body_Digestion.Error.Any
  >;
}

export type {
  HTTP_Response_Body_Wrapped,
};
