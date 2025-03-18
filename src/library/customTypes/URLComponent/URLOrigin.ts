import StringSubset from '@/library/customTypes/StringSubset.ts';

import type {
  StaticStringParser,
} from '@/library/typeUtilities/StaticStringParser.ts';

export class URLOrigin
  extends StringSubset<'URLOrigin'>
  implements StaticStringParser<typeof URLOrigin> {
  public static tryToParseFrom(givenSubject: string): URLOrigin {
    const derived = new URL(givenSubject);

    if (
      derived.origin !== givenSubject
    ) throw new Error(`Expected pure origin: ${derived.origin}, got: ${givenSubject}`);

    return new URLOrigin(derived.origin);
  }
}
