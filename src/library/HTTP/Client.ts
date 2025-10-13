import {
  Option,
} from 'effect';

import Attempt from '@/library/Attempt';
import ContentDescriptor from '@/library/ContentDescriptor';
import URLComponent from '@/library/URLComponent';

import {
  HTTP_Endpoint,
} from './Endpoint';

import {
  HTTP_Request,
} from './Request';

import {
  bodyOf,
} from './Response';

class HTTP_Client {
  public static readonly local = (() => {
    const localOrigin = URLComponent.Origin(location.origin);
    return new HTTP_Client(localOrigin);
  })();

  public constructor(
    public readonly origin: URLComponent.Origin,
    public readonly headers?: HTTP_Request.HeaderMap,
  ) {}

  public static contentIsJSONIn = (
    givenResponse: Response,
  ): boolean => bodyOf(givenResponse).isSuggestedToBeDigestibleAs(ContentDescriptor.json);

  public originAt(givenPath: URLComponent.Path): URL {
    const serializedURLComponents = this.origin.concat(givenPath);
    return new URL(serializedURLComponents);
  }

  public send = async (
    givenRequestBody: unknown,
    {
      to: givenPath,
      using: givenMethod,
    }: {
      to: URLComponent.Path;
      using: HTTP_Request.Method;
    },
  ): Promise<HTTP_Endpoint.Outcome> => Attempt.Fresh.thatEventually(async () => {
    const endpointURL = this.originAt(givenPath);

    const promisedResponse = fetch(endpointURL, {
      method : givenMethod,
      headers: this.headers,
      body   : (givenMethod === HTTP_Request.Method.FETCH)
        ? null
        : JSON.stringify(givenRequestBody),
    });

    const outcomeOfSettlingResponse = await Attempt.Adapted.toSettle(promisedResponse, {
      interpretationOf: (caughtError) => {
        const clientFailedToReachServer = caughtError.message.includes('Failed to fetch');

        if (
          !clientFailedToReachServer
        ) return Option.none();

        return Option.some(new HTTP_Endpoint.Error.FailedToSendRequest(endpointURL));
      },
    });

    if (
      Attempt.Outcome.isFailure(outcomeOfSettlingResponse)
    ) return outcomeOfSettlingResponse;

    const response = outcomeOfSettlingResponse.value;

    if (!response.ok) {
      const newResponseError = new HTTP_Endpoint.Error.RespondedWithFailure(response.statusText, response.status);
      return Attempt.Outcome.failCause(newResponseError);
    }

    const outcomeOfDigestingResponseBody = await bodyOf(response).digestAsUnknown();

    return Attempt.Outcome.mapErrorCause(
      outcomeOfDigestingResponseBody,
      $0 => new HTTP_Endpoint.Error.IndigestibleResponseBody(endpointURL, $0),
    );
  });

  public async fetchResource(
    {
      from: givenPath,
    }: {
      from: URLComponent.Path;
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
      to: URLComponent.Path;
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
      to: URLComponent.Path;
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
      to: URLComponent.Path;
    },
  ): Promise<HTTP_Endpoint.Outcome> {
    return await this.send(givenChanges, {
      to   : givenPath,
      using: HTTP_Request.Method.UPDATE,
    });
  }

  public async deleteResourceAt(
    givenPath: URLComponent.Path,
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
