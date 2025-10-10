import Attempt from '@/library/Attempt';
import type URLComponent from '@/library/URLComponent';

class TextToImage_Server_Error_MissingSpecification
  extends Attempt.Error.Tagged(
    'TextToImage_Server_Error_MissingSpecification',
  ) {
  public constructor(
    public readonly environmentKey: string,
    public readonly file: URLComponent.Path,
    public readonly endpoint: URLComponent.Path,
  ) {
    super('Failed to determine text-to-image server');
  }
}

export {
  TextToImage_Server_Error_MissingSpecification,
};
