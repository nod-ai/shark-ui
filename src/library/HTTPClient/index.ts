import {
  Outcome,
} from '@/library/Attempt';

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

  public async send(
    givenRequestBody: unknown,
    {
      to: givenPath,
      using: givenMethod,
    }: {
      to: URLPath;
      using: HTTPRequest.Method;
    },
  ): Promise<Outcome<unknown, HTTPResponseError>> {
    const response = await fetch(this.originAt(givenPath), {
      method : givenMethod,
      headers: this.headers,
      body   : JSON.stringify(givenRequestBody),
    });

    if (
      !response.ok
    ) return Outcome.failureDueTo(new HTTPResponseError(response.statusText, response.status));

    return Outcome.successThatYielded(await response.json());
  }

  public async fetchResource(
    {
      from: givenPath,
    }: {
      from: URLPath;
    },
  ): Promise<Outcome<unknown, HTTPResponseError>> {
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
  ): Promise<Outcome<unknown, HTTPResponseError>> {
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
  ): Promise<Outcome<unknown, HTTPResponseError>> {
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
  ): Promise<Outcome<unknown, HTTPResponseError>> {
    return await this.send(givenChanges, {
      to   : givenPath,
      using: HTTPRequest.Method.UPDATE,
    });
  }

  public async deleteResourceAt(
    givenPath: URLPath,
  ): Promise<Outcome<unknown, HTTPResponseError>> {
    return await this.send(null, {
      to   : givenPath,
      using: HTTPRequest.Method.DELETE,
    });
  }
}
