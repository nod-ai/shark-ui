import Attempt from '@/library/Attempt';

import type {
  URLComponent,
} from '@/library/URLComponent';

class TextToImage_Server_Error_Specification
  extends Attempt.Error.Actionable<
    'TextToImage_Server_Error_Specification'
  > {
  public override name = 'TextToImage_Server_Error_Specification' as const;

  public constructor(
    public readonly environmentKey: string,
    public readonly file: URLComponent.Path,
    public readonly endpoint: URLComponent.Path,
  ) {
    super('Failed to determine text-to-image server');
  }
}

export {
  TextToImage_Server_Error_Specification,
};
