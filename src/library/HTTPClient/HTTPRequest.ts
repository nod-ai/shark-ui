/** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) */
export enum Method {
  CREATE /**/ = 'PUT',
  FETCH /* */ = 'GET',
  UPDATE /**/ = 'PATCH',
  DELETE /**/ = 'DELETE',
  SUBMIT /**/ = 'POST',
}

export type HeaderMap = Record<string, string>;
