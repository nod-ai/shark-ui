/** See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#successful_responses) */
export enum SuccessStatusCode {
  OK /*                */ = 200,
  Created /*           */ = 201,
  Accepted /*          */ = 202,
  NoContent /*         */ = 204,
}
/** See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses) */
export enum ClientErrorStatusCode {
  BadRequest /*        */ = 400,
  Unauthorized /*      */ = 401,
  Forbidden /*         */ = 403,
  NotFound /*          */ = 404,
}
/** See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#server_error_responses) */
export enum ServerErrorStatusCode {
  Internal /*          */ = 500,
  NotImplemented /*    */ = 501,
  BadGateway /*        */ = 502,
  ServiceUnavailable /**/ = 503,
}

export type ErrorStatusCode =
  | ClientErrorStatusCode
  | ServerErrorStatusCode;

export type StatusCode =
  | SuccessStatusCode
  | ErrorStatusCode;
