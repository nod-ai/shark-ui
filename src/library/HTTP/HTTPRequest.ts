/** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) */
enum Method {
  CREATE /**/ = 'PUT',
  FETCH /* */ = 'GET',
  UPDATE /**/ = 'PATCH',
  DELETE /**/ = 'DELETE',
  SUBMIT /**/ = 'POST',
}

type HeaderMap = Record<string, string>;

export {
  Method,
  type HeaderMap,
};
