import Attempt from '@/library/Attempt';

import type {
  URLComponent_Origin,
  URLComponent_Path,
} from '@/library/URLComponent';

import {
  HTTP_Endpoint,
} from './Endpoint';

import {
  HTTP_Request,
} from './Request';

class HTTP_Client {
  public constructor(
    public readonly origin: URLComponent_Origin,
    public readonly headers: HTTP_Request.HeaderMap,
  ) {}

  public static contentIsJSONIn = (
    givenResponse: Response,
  ): boolean => {
    const rawContentDescriptor = givenResponse.headers.get('Content-Type');

    if (
      rawContentDescriptor === null
    ) return false;

    return rawContentDescriptor.includes('application/json');
  };

  public originAt(givenPath: URLComponent_Path): URL {
    const serializedURLComponents = this.origin.appendedWith(givenPath);
    return new URL(serializedURLComponents);
  }

  public send = async (
    givenRequestBody: unknown,
    {
      to: givenPath,
      using: givenMethod,
    }: {
      to: URLComponent_Path;
      using: HTTP_Request.Method;
    },
  ): Promise<HTTP_Endpoint.Outcome> => Attempt.Fresh_thatEventually(async (ends) => {
    const endpointURL = this.originAt(givenPath);

    const promisedResponse = fetch(endpointURL, {
      method : givenMethod,
      headers: this.headers,
      body   : JSON.stringify(givenRequestBody),
    });

    const outcomeOfSettlingResponse = await Attempt.Adapted_toSettle(promisedResponse, {
      interpretationOf: (caughtError) => {
        const clientFailedToReachServer = caughtError.message.includes('Failed to fetch');

        if (
          !clientFailedToReachServer
        ) return null;

        return new HTTP_Endpoint.Error.Request(endpointURL);
      },
    });

    if (
      outcomeOfSettlingResponse.isFailure
    ) return outcomeOfSettlingResponse;

    const response = outcomeOfSettlingResponse.unwrapped;

    if (
      !response.ok
    ) return ends.inFailureDueTo(new HTTP_Endpoint.Error.Response(response.statusText, response.status));

    const responseBody: unknown = await response.json();
    return ends.inSuccessWith(responseBody);
  });

  public async fetchResource(
    {
      from: givenPath,
    }: {
      from: URLComponent_Path;
    },
  ): Promise<HTTP_Endpoint.Outcome> {
    return await this.send(null, {
      to   : givenPath,
      using: HTTP_Request.Method.FETCH,
    });
  }

  public async submitResource(
    {
      bySending: givenSubmission,
      to: givenPath,
    }: {
      bySending: unknown;
      to: URLComponent_Path;
    },
  ): Promise<HTTP_Endpoint.Outcome> {
    return await this.send(givenSubmission, {
      to   : givenPath,
      using: HTTP_Request.Method.SUBMIT,
    });
  }

  public async createResource(
    {
      bySending: givenProperties,
      to: givenPath,
    }: {
      bySending: unknown;
      to: URLComponent_Path;
    },
  ): Promise<HTTP_Endpoint.Outcome> {
    return await this.send(givenProperties, {
      to   : givenPath,
      using: HTTP_Request.Method.CREATE,
    });
  }

  public async updateResource(
    {
      bySending: givenChanges,
      to: givenPath,
    }: {
      bySending: unknown;
      to: URLComponent_Path;
    },
  ): Promise<HTTP_Endpoint.Outcome> {
    return await this.send(givenChanges, {
      to   : givenPath,
      using: HTTP_Request.Method.UPDATE,
    });
  }

  public async deleteResourceAt(
    givenPath: URLComponent_Path,
  ): Promise<HTTP_Endpoint.Outcome> {
    return await this.send(null, {
      to   : givenPath,
      using: HTTP_Request.Method.DELETE,
    });
  }
}

export {
  HTTP_Client,
};
