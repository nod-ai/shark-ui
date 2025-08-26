import Sequence_Byte_Encoded_Base64 from '@/library/Base64CharacterEncodedByteSequence';

import {
  string as Schema_string,
  NEVER as Schema_NEVER,
} from './core';

/** An alternative to `Schema.base64()` that avoids using the deprecated `atob` conversion under the hood */
const Schema_base64CharacterEncodedByteSequence = () => Schema_string().transform((someSubject, currentContext) => {
  const outcomeOfParsingSubject = Sequence_Byte_Encoded_Base64.parsedFrom(someSubject);

  if (
    outcomeOfParsingSubject.isSuccess
  ) return outcomeOfParsingSubject.unwrapped;

  currentContext.addIssue({
    code   : 'custom',
    message: outcomeOfParsingSubject.cause.message,
  });

  return Schema_NEVER;
});

export {
  Schema_base64CharacterEncodedByteSequence,
};
