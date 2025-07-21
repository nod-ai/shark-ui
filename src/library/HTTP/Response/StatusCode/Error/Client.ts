/** See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses) */
enum HTTP_Response_StatusCode_Error_Client {
  BadRequest /*  */ = 400,
  Unauthorized /**/ = 401,
  Forbidden /*   */ = 403,
  NotFound /*    */ = 404,
}

export {
  HTTP_Response_StatusCode_Error_Client,
};
