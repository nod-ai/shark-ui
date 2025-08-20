import Attempt from '@/library/Attempt';

import type {
  URLComponent_Path,
} from '@/library/URLComponent';

class DynamicConfig_FetchingError
  extends Attempt.ActionableError<
  'DynamicConfig_FetchingError'
> {
  public override name = 'DynamicConfig_FetchingError' as const;

  public constructor(
    givenEndpoint: URLComponent_Path,
  ) {
    super(`Failed to fetch text-to-image config from endpoint: ${givenEndpoint.toString()}`);
  }
}

export {
  DynamicConfig_FetchingError as default,
};
