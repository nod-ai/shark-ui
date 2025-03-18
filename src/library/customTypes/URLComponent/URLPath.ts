import StringSubset from '@/library/customTypes/StringSubset.ts';

import type {
  StaticStringParser,
} from '@/library/typeUtilities/StaticStringParser.ts';

export class URLPath
  extends StringSubset<'URLPath'>
  implements StaticStringParser<typeof URLPath> {
  public static tryToParseFrom(givenSubject: string): URLPath {
    const exampleURL = new URL(`https://example.com${givenSubject}`);

    if (
      exampleURL.pathname !== givenSubject
    ) throw new Error(`Expected pure path: ${exampleURL.pathname}, got: ${givenSubject}`);

    return new URLPath(exampleURL.pathname);
  }
}
