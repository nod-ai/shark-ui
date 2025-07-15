import Attempt from '@/library/Attempt';

class HTTP_Endpoint_RequestError
  extends Attempt.ActionableError<
  'HTTP_Endpoint_RequestError'
> {
  public override name = 'HTTP_Endpoint_RequestError' as const;

  public constructor(
    public readonly endpoint: URL,
  ) {
    super(`Failed to fetch from "${endpoint.toString()}".`);
  }
}

export {
  HTTP_Endpoint_RequestError,
};
