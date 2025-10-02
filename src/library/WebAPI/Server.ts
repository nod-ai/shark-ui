import Schema_old from '@/library/Schema';

/**
 * The machine conforming to some web API that:
 * - listens for requests
 * - responds to those requests
 */
class WebAPI_Server {
  public constructor(
    /**
     * The web location of the server, which is the base URL of the API.
     * For example: https://api.example.com
     */
    public readonly origin: string,
  ) {}

  public static from(given: WebAPI_Server): WebAPI_Server {
    const clonedServer = new WebAPI_Server(
      given.origin,
    );

    return clonedServer;
  }

  public static Schema_old = Schema_old
    .object({
      origin: Schema_old.string(),
    })
    .transform($0 => WebAPI_Server.from($0));
}

export {
  WebAPI_Server,
};
