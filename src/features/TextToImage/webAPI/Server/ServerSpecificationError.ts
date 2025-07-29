import Attempt from '@/library/Attempt';

import type {
  URLPath,
} from '@/library/URLComponent/exports';

class TextToImage_Server_SpecificationError
  extends Attempt.ActionableError<
  'TextToImage_Server_SpecificationError'
> {
  public override name = 'TextToImage_Server_SpecificationError' as const;

  public constructor(
    public readonly environmentKey: string,
    public readonly file: URLPath,
    public readonly endpoint: URLPath,
  ) {
    super('Failed to determine text-to-image server');
  }
}

export {
  TextToImage_Server_SpecificationError as default,
};
