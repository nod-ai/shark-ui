import Attempt from '@/library/Attempt';

import type {
  URLComponent_Path,
} from '@/library/URLComponent';

class TextToImage_Server_Error_Specification
  extends Attempt.Error_Actionable<
    'TextToImage_Server_Error_Specification'
  > {
  public override name = 'TextToImage_Server_Error_Specification' as const;

  public constructor(
    public readonly environmentKey: string,
    public readonly file: URLComponent_Path,
    public readonly endpoint: URLComponent_Path,
  ) {
    super('Failed to determine text-to-image server');
  }
}

export {
  TextToImage_Server_Error_Specification,
};
