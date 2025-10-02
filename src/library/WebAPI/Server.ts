import {
  Schema,
} from 'effect';

/**
 * The machine conforming to some web API that:
 * - listens for requests
 * - responds to those requests
 */
class WebAPI_Server
  extends Schema.Class<WebAPI_Server>('WebAPI_Server')({
    /**
     * The web location of the server, which is the base URL of the API.
     * For example: https://api.example.com
     */
    origin: Schema.String,
  }) {
  public static from(given: WebAPI_Server): WebAPI_Server {
    const clonedServer = new WebAPI_Server(
      given,
    );

    return clonedServer;
  }
}

export {
  WebAPI_Server,
};
