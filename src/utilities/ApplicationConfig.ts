import {
  z,
} from 'zod';

import * as WebAPI from '@/library/WebAPI';

import type {
  URLPath,
} from '@/library/customTypes/URLComponent';

const z_applicationConfig = z.object({
  server: z.unknown().transform($0 => WebAPI.Server.tryToParseFrom($0)),
});

type ApplicationConfigSchema = z.infer<typeof z_applicationConfig>;

export class ApplicationConfig implements ApplicationConfigSchema {
  public constructor(
    public readonly server: WebAPI.Server,
  ) {}

  public static from(another: ApplicationConfig): ApplicationConfig {
    return new ApplicationConfig(
      another.server,
    );
  }

  public static tryToParseFrom(given: unknown): ApplicationConfig {
    const parsedConfig = z_applicationConfig.parse(given);
    return ApplicationConfig.from(parsedConfig);
  }

  public static async tryToFetchFrom(givenPath: URLPath): Promise<ApplicationConfig> {
    const configResponse = await fetch(givenPath.toString());
    const contentType = configResponse.headers.get('Content-Type');

    if (
      !contentType?.includes('application/json')
    ) throw new Error('Environment config: expected JSON response but received non-JSON content.');

    const unparsedConfig = await configResponse.json() as unknown;
    return this.tryToParseFrom(unparsedConfig);
  }
}
