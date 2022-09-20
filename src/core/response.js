class Response {
  send(code = STATUS_CODE.OK, message, response, data = {}) {
    let success = true;

    message ??= 'Thành công';
    response.statusCode = code;

    if (code >= 400) {
      message ??= 'Lỗi không xác định';
      success = false;
    }

    response.send({
      code,
      success,
      result: {
        message,
        data: typeof data !== "object" && !Array.isArray(data) ? data : {}
      }
    });
  }
}

exports.Response = new Response();