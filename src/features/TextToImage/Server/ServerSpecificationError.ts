import Attempt from '@/library/Attempt';

import type {
  URLComponent_Path,
} from '@/library/URLComponent';

class TextToImage_Server_SpecificationError
  extends Attempt.ActionableError<
  'TextToImage_Server_SpecificationError'
> {
  public override name = 'TextToImage_Server_SpecificationError' as const;

  public constructor(
    public readonly environmentKey: string,
    public readonly file: URLComponent_Path,
    public readonly endpoint: URLComponent_Path,
  ) {
    super('Failed to determine text-to-image server');
  }
}

export {
  TextToImage_Server_SpecificationError as default,
};
