import Attempt from '@/library/Attempt';

import type {
  URLOrigin,
  URLPath,
} from '@/library/URLComponent';

import {
  HTTP_Endpoint,
} from './Endpoint';

import {
  HTTP_Request,
} from './Request';

class HTTP_Client {
  public constructor(
    public readonly origin: URLOrigin,
    public readonly headers: HTTP_Request.HeaderMap,
  ) {}

  public originAt(givenPath: URLPath): URL {
    const serializedURLComponents = this.origin.appendedWith(givenPath);
    return new URL(serializedURLComponents);
  }

  public send = async (
    givenRequestBody: unknown,
    {
      to: givenPath,
      using: givenMethod,
    }: {
      to: URLPath;
      using: HTTP_Request.Method;
    },
  ): Promise<HTTP_Endpoint.Outcome> => Attempt.thatEventually(async (ends) => {
    const endpointURL = this.originAt(givenPath);

    const promisedResponse = fetch(endpointURL, {
      method : givenMethod,
      headers: this.headers,
      body   : JSON.stringify(givenRequestBody),
    });

    const outcomeOfSettlingResponse = await Attempt.toSettle(promisedResponse, {
      interpretationOf: (caughtError) => {
        const clientFailedToReachServer = caughtError.message.includes('Failed to fetch');

        if (
          !clientFailedToReachServer
        ) return null;

        return new HTTP_Endpoint.RequestError(endpointURL);
      },
    });

    if (
      outcomeOfSettlingResponse.isFailure
    ) return outcomeOfSettlingResponse;

    const response = outcomeOfSettlingResponse.unwrapped;

    if (
      !response.ok
    ) return ends.inFailureDueTo(new HTTP_Endpoint.ResponseError(response.statusText, response.status));

    const responseBody: unknown = await response.json();
    return ends.inSuccessWith(responseBody);
  });

  public async fetchResource(
    {
      from: givenPath,
    }: {
      from: URLPath;
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
      to: URLPath;
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
      to: URLPath;
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
      to: URLPath;
    },
  ): Promise<HTTP_Endpoint.Outcome> {
    return await this.send(givenChanges, {
      to   : givenPath,
      using: HTTP_Request.Method.UPDATE,
    });
  }

  public async deleteResourceAt(
    givenPath: URLPath,
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
