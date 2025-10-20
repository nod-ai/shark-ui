import {
  Effect,
} from 'effect';

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

  public send = (
    givenRequestBody: unknown,
    {
      to: givenPath,
      using: givenMethod,
    }: {
      to: URLComponent.Path;
      using: HTTP_Request.Method;
    },
  ): HTTP_Endpoint.Effect => Effect.gen(this, function* () {
    const endpointURL = this.originAt(givenPath);

    const promisedResponse = fetch(endpointURL, {
      method : givenMethod,
      headers: this.headers,
      body   : (givenMethod === HTTP_Request.Method.FETCH)
        ? null
        : JSON.stringify(givenRequestBody),
    });

    const fetchedResponse = yield* Effect.tryPromise(() => promisedResponse).pipe(
      Effect.catchAll((someException) => {
        const caughtError = someException.cause;
        const isFailureToReachServer = ($0: unknown): boolean => ($0 instanceof Error) && $0.message.includes('Failed to fetch');

        if (
          isFailureToReachServer(caughtError)
        ) return new HTTP_Endpoint.Error.FailedToSendRequest({
          endpoint: endpointURL,
        });

        return Effect.die(someException);
      }),
    );

    if (!fetchedResponse.ok) {
      const newResponseError = new HTTP_Endpoint.Error.RespondedWithFailure({
        message: fetchedResponse.statusText,
        status : fetchedResponse.status,
      });

      return yield* newResponseError;
    }

    const digestedResponseBody = yield* Effect.mapError(
      bodyOf(fetchedResponse).digestAsUnknown,
      $0 => new HTTP_Endpoint.Error.IndigestibleResponseBody({
        endpoint: endpointURL,
        cause   : $0,
      }),
    );

    return digestedResponseBody;
  });

  public fetchResource(
    {
      from: givenPath,
    }: {
      from: URLComponent.Path;
    },
  ): HTTP_Endpoint.Effect {
    return this.send(null, {
      to   : givenPath,
      using: HTTP_Request.Method.FETCH,
    });
  }

  public submitResource(
    {
      bySending: givenSubmission,
      to: givenPath,
    }: {
      bySending: unknown;
      to: URLComponent.Path;
    },
  ): HTTP_Endpoint.Effect {
    return this.send(givenSubmission, {
      to   : givenPath,
      using: HTTP_Request.Method.SUBMIT,
    });
  }

  public createResource(
    {
      bySending: givenProperties,
      to: givenPath,
    }: {
      bySending: unknown;
      to: URLComponent.Path;
    },
  ): HTTP_Endpoint.Effect {
    return this.send(givenProperties, {
      to   : givenPath,
      using: HTTP_Request.Method.CREATE,
    });
  }

  public updateResource(
    {
      bySending: givenChanges,
      to: givenPath,
    }: {
      bySending: unknown;
      to: URLComponent.Path;
    },
  ): HTTP_Endpoint.Effect {
    return this.send(givenChanges, {
      to   : givenPath,
      using: HTTP_Request.Method.UPDATE,
    });
  }

  public deleteResourceAt(
    givenPath: URLComponent.Path,
  ): HTTP_Endpoint.Effect {
    return this.send(null, {
      to   : givenPath,
      using: HTTP_Request.Method.DELETE,
    });
  }
}

export {
  HTTP_Client,
};
