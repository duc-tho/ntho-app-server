class Response {
  send(code = 200, message, response) {
    let success = true;

    message ??= 'Successfully';
    response.statusCode = code;

    if (code >= 400) {
      message ??= 'Unknow error';
      success = false;
    }

    response.send({
      code,
      success,
      result: message
    });
  }
}

exports.Response = new Response();