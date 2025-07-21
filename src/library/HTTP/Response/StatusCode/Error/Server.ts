/** See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#server_error_responses) */
enum HTTP_Response_StatusCode_Error_Server {
  Internal /*          */ = 500,
  NotImplemented /*    */ = 501,
  BadGateway /*        */ = 502,
  ServiceUnavailable /**/ = 503,
}

export {
  HTTP_Response_StatusCode_Error_Server,
};
