import Attempt from '@/library/Attempt';

import type {
  URLOrigin,
  URLPath,
} from '@/library/customTypes/URLComponent';

import * as HTTPRequest from './HTTPRequest.ts';
import HTTPResponseError from './HTTPResponseError.ts';

class HTTP_Client {
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

  public send = async (
    givenRequestBody: unknown,
    {
      to: givenPath,
      using: givenMethod,
    }: {
      to: URLPath;
      using: HTTPRequest.Method;
    },
  ): Promise<Attempt.Outcome<unknown, HTTPResponseError>> => Attempt.thatEventually(async (ends) => {
    const response = await fetch(this.originAt(givenPath), {
      method : givenMethod,
      headers: this.headers,
      body   : JSON.stringify(givenRequestBody),
    });

    if (
      !response.ok
    ) return ends.inFailureDueTo(new HTTPResponseError(response.statusText, response.status));

    const responseBody: unknown = await response.json();
    return ends.inSuccessWith(responseBody);
  });

  public async fetchResource(
    {
      from: givenPath,
    }: {
      from: URLPath;
    },
  ): Promise<Attempt.Outcome<unknown, HTTPResponseError>> {
    return await this.send(null, {
      to   : givenPath,
      using: HTTPRequest.Method.FETCH,
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
  ): Promise<Attempt.Outcome<unknown, HTTPResponseError>> {
    return await this.send(givenSubmission, {
      to   : givenPath,
      using: HTTPRequest.Method.SUBMIT,
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
  ): Promise<Attempt.Outcome<unknown, HTTPResponseError>> {
    return await this.send(givenProperties, {
      to   : givenPath,
      using: HTTPRequest.Method.CREATE,
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
  ): Promise<Attempt.Outcome<unknown, HTTPResponseError>> {
    return await this.send(givenChanges, {
      to   : givenPath,
      using: HTTPRequest.Method.UPDATE,
    });
  }

  public async deleteResourceAt(
    givenPath: URLPath,
  ): Promise<Attempt.Outcome<unknown, HTTPResponseError>> {
    return await this.send(null, {
      to   : givenPath,
      using: HTTPRequest.Method.DELETE,
    });
  }
}

export {
  HTTP_Client,
};
