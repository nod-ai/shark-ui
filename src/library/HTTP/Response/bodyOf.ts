import Attempt from '@/library/Attempt';
import ContentDescriptor from '@/library/ContentDescriptor';

import {
  HTTP_Header,
} from '../Header';

import {
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
  async digestAsUnknown() {
    return Attempt.Fresh.thatEventually(async (ends) => {
      if (!this.isSuggestedToBeDigestibleAs(ContentDescriptor.json)) {
        const newDescriptorMismatchError = new HTTP_Response_Body.Digestion.Error.DescriptorMismatch(givenResponse, ContentDescriptor.json);
        return ends.inFailureDueTo(newDescriptorMismatchError);
      }

      const promiseForDigestedResponseBody: Promise<unknown> = givenResponse.json();

      const outcomeOfDigestingResponseBody = await Attempt.Adapted.toSettle(promiseForDigestedResponseBody, {
        interpretationOf: (caughtError) => {
          if (
            caughtError instanceof SyntaxError
          ) return new HTTP_Response_Body.Digestion.Error.InvalidJSONSyntax(caughtError);

          return null;
        },
      });

      return outcomeOfDigestingResponseBody;
    });
  },
});

export {
  bodyOf,
};
