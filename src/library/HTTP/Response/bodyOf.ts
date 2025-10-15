import {
  Effect,
  Exit,
} from 'effect';

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
    return Effect.runPromise(Effect.promise(async () => {
      if (!this.isSuggestedToBeDigestibleAs(ContentDescriptor.json)) {
        const newDescriptorMismatchError = new HTTP_Response_Body.Digestion.Error.DescriptorMismatch(givenResponse, ContentDescriptor.json);
        return Exit.fail(newDescriptorMismatchError);
      }

      const promiseForDigestedResponseBody: Promise<unknown> = givenResponse.json();

      const exitFromDigestingResponseBody = await Effect.runPromiseExit(Effect.tryPromise(() => promiseForDigestedResponseBody).pipe(
        Effect.catchAll((someException) => {
          const caughtError = someException.cause;

          if (
            caughtError instanceof SyntaxError
          ) return new HTTP_Response_Body.Digestion.Error.InvalidJSONSyntax(caughtError);

          return Effect.die(caughtError);
        }),
      ));

      return exitFromDigestingResponseBody;
    }));
  },
});

export {
  bodyOf,
};
