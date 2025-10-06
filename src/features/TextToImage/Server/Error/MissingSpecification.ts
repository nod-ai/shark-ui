import Attempt from '@/library/Attempt';
import type URLComponent from '@/library/URLComponent';

class TextToImage_Server_Error_MissingSpecification
  extends Attempt.Error.Actionable<
    'TextToImage_Server_Error_MissingSpecification'
  > {
  public override name = 'TextToImage_Server_Error_MissingSpecification' as const;

  public constructor(
    public readonly environmentKey: string,
    public readonly file: URLComponent.Path_dep,
    public readonly endpoint: URLComponent.Path_dep,
  ) {
    super('Failed to determine text-to-image server');
  }
}

export {
  TextToImage_Server_Error_MissingSpecification,
};
