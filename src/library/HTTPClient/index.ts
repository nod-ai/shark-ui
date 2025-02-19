import * as HTTPRequest from './HTTPRequest.ts';
import HTTPResponseError from './HTTPResponseError.ts';

export default class HTTPClient {
  headerMap: HTTPRequest.HeaderMap;

  constructor(givenHeaders: HTTPRequest.HeaderMap) {
    this.headerMap = givenHeaders;
  }

  async tryToSend(
    givenRequestBody: unknown,
    {
      to: givenEndpoint,
      using: givenMethod,
    }: {
      to: URL;
      using: HTTPRequest.Method;
    },
  ): Promise<unknown> {
    const response = await fetch(givenEndpoint, {
      method : givenMethod,
      headers: this.headerMap,
      body   : JSON.stringify(givenRequestBody),
    });

    if (!response.ok) throw new HTTPResponseError(response.statusText, response.status);

    return await response.json();
  };

  async tryToFetchResource(
    {
      from: givenEndpoint,
    }: {
      from: URL;
    },
  ): Promise<unknown> {
    return await this.tryToSend(null, {
      to   : givenEndpoint,
      using: HTTPRequest.Method.FETCH,
    });
  };

  async tryToSubmitResource(
    {
      bySending: givenSubmission,
      to: givenEndpoint,
    }: {
      bySending: unknown;
      to: URL;
    },
  ): Promise<unknown> {
    return await this.tryToSend(givenSubmission, {
      to   : givenEndpoint,
      using: HTTPRequest.Method.SUBMIT,
    });
  };

  async tryToCreateResource(
    {
      bySending: givenProperties,
      to: givenEndpoint,
    }: {
      bySending: unknown;
      to: URL;
    },
  ): Promise<unknown> {
    return await this.tryToSend(givenProperties, {
      to   : givenEndpoint,
      using: HTTPRequest.Method.CREATE,
    });
  };

  async tryToUpdateResource(
    {
      bySending: givenChanges,
      to: givenEndpoint,
    }: {
      bySending: unknown;
      to: URL;
    },
  ): Promise<unknown> {
    return await this.tryToSend(givenChanges, {
      to   : givenEndpoint,
      using: HTTPRequest.Method.UPDATE,
    });
  };

  async tryToDeleteResourceAt(givenEndpoint: URL): Promise<unknown> {
    return await this.tryToSend(null, {
      to   : givenEndpoint,
      using: HTTPRequest.Method.DELETE,
    });
  };
}
