import Attempt from '@/library/Attempt';

class HTTP_Endpoint_RequestError
  extends Attempt.ActionableError<
  'HTTP_Endpoint_RequestError'
> {
  public constructor(
    public readonly endpoint: URL,
  ) {
    super(`Failed to fetch from "${endpoint.toString()}".`);
    this.name = 'HTTP_Endpoint_RequestError';
  }
}

export {
  HTTP_Endpoint_RequestError,
};
