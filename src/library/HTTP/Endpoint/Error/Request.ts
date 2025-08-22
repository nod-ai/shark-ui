import Attempt from '@/library/Attempt';

class HTTP_Endpoint_Error_Request
  extends Attempt.Error_Actionable<
  'HTTP_Endpoint_Error_Request'
> {
  public override name = 'HTTP_Endpoint_Error_Request' as const;

  public constructor(
    public readonly endpoint: URL,
  ) {
    super(`Failed to fetch from "${endpoint.toString()}".`);
  }
}

export {
  HTTP_Endpoint_Error_Request,
};
