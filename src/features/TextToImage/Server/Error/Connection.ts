import Attempt from '@/library/Attempt';

class TextToImage_Server_Error_Connection
  extends Attempt.Error_Actionable<
    'TextToImage_Server_Error_Connection'
  > {
  public override name = 'TextToImage_Server_Error_Connection' as const;

  public constructor(
    public readonly endpoint: URL,
  ) {
    super(`Failed to reach the text-to-image server at "${endpoint.origin}".`);
  }
}

export {
  TextToImage_Server_Error_Connection as default,
};
