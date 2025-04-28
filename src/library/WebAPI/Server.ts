import {
  z,
} from 'zod';

const z_serverSchema = z.object({
  origin: z.string(),
});

type ServerSchema = z.infer<typeof z_serverSchema>;

/**
 * The machine conforming to some web API that:
 * - listens for requests
 * - responds to those requests
 */
export default class Server implements ServerSchema {
  public constructor(
    /**
     * The web location of the server, which is the base URL of the API.
     * For example: https://api.example.com
     */
    public readonly origin: string,
  ) {}

  public static from(given: Server): Server {
    return new Server(
      given.origin,
    );
  }

  public static tryToParseFrom(givenSubject: unknown): Server {
    const parsedSubject = z_serverSchema.parse(givenSubject);
    return Server.from(parsedSubject);
  }
};
