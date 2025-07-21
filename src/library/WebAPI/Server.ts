/**
 * The machine conforming to some web API that:
 * - listens for requests
 * - responds to those requests
 */
class Server {
  public constructor(
    /**
     * The web location of the server, which is the base URL of the API.
     * For example: https://api.example.com
     */
    public readonly origin: string,
  ) {}

  public static from(given: Server): Server {
    const clonedServer = new Server(
      given.origin,
    );

    return clonedServer;
  }
}

export {
  Server as default,
};
