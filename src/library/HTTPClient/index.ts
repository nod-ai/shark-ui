import type {
  URLOrigin,
  URLPath,
} from '@/library/customTypes/URLComponent';

import * as HTTPRequest from './HTTPRequest.ts';
import HTTPResponseError from './HTTPResponseError.ts';

export default class HTTPClient {
  public readonly origin: URLOrigin;
  public readonly headers: HTTPRequest.HeaderMap;

  public constructor(given: {
    origin: URLOrigin;
    headers: HTTPRequest.HeaderMap;
  }) {
    this.origin = given.origin;
    this.headers = given.headers;
  }

  public originAt(givenPath: URLPath): URL {
    return new URL(
      [
        this.origin,
        givenPath,
      ]
        .map($0 => $0.toString())
        .join(''),
    );
  }

  public async tryToSend(
    givenRequestBody: unknown,
    {
      to: givenPath,
      using: givenMethod,
    }: {
      to: URLPath;
      using: HTTPRequest.Method;
    },
  ): Promise<unknown> {
    const response = await fetch(this.originAt(givenPath), {
      method : givenMethod,
      headers: this.headers,
      body   : JSON.stringify(givenRequestBody),
    });

    if (!response.ok) throw new HTTPResponseError(response.statusText, response.status);

    return await response.json();
  };

  public async tryToFetchResource(
    {
      from: givenPath,
    }: {
      from: URLPath;
    },
  ): Promise<unknown> {
    return await this.tryToSend(null, {
      to   : givenPath,
      using: HTTPRequest.Method.FETCH,
    });
  };

  public async tryToSubmitResource(
    {
      bySending: givenSubmission,
      to: givenPath,
    }: {
      bySending: unknown;
      to: URLPath;
    },
  ): Promise<unknown> {
    return await this.tryToSend(givenSubmission, {
      to   : givenPath,
      using: HTTPRequest.Method.SUBMIT,
    });
  };

  public async tryToCreateResource(
    {
      bySending: givenProperties,
      to: givenPath,
    }: {
      bySending: unknown;
      to: URLPath;
    },
  ): Promise<unknown> {
    return await this.tryToSend(givenProperties, {
      to   : givenPath,
      using: HTTPRequest.Method.CREATE,
    });
  };

  public async tryToUpdateResource(
    {
      bySending: givenChanges,
      to: givenPath,
    }: {
      bySending: unknown;
      to: URLPath;
    },
  ): Promise<unknown> {
    return await this.tryToSend(givenChanges, {
      to   : givenPath,
      using: HTTPRequest.Method.UPDATE,
    });
  };

  public async tryToDeleteResourceAt(givenPath: URLPath): Promise<unknown> {
    return await this.tryToSend(null, {
      to   : givenPath,
      using: HTTPRequest.Method.DELETE,
    });
  };
}
