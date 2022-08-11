const {Response} = require("../core/response");
const {JWT} = require("../core/jwt");

class TokenCheckMiddlaware {
  verify(request, reply, next) {
    let token = "";
    
    if (!request.headers.hasOwnProperty('authorization')) return Response.send(401, "Bạn không có quyền truy cập vào tính năng này", reply);

    const { authorization } = request.headers;
    
    token = authorization.split(" ")[1];
    if (!token) return Response.send(401, "Token không hợp lệ", reply);

    JWT.verify(token)
      .then((decoded) => {
        if (!decoded) return Response.send(401, "Token không hợp lệ", reply);
  
        request.data = decoded;
  
        next();
      })
      .catch(() => {
        return Response.send(500, "Lỗi xác thực từ server", reply);
      });
  }
}

exports.TokenCheckMiddlaware = new TokenCheckMiddlaware();