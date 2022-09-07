const { Response } = require("../core/response");
const bcrypt = require("bcrypt");
const { models: { User, Profile } } = require("../core/database");
const {JWT} = require("../core/jwt");

class AuthController {
  async refresh(request, reply) {
    if (!request.body || !request.body.refreshToken)
      return Response.send(401, "Thiếu thông tin", reply);
    
    const { refreshToken } = request.body;

    let decoded = await JWT.verify(refreshToken, true);
    if (!decoded) return Response.send(401, "Refresh token không hợp lệ", reply);
    
    const accessToken = await JWT.sign(decoded.userId);
    if(!accessToken) return Response.send(401, "Tạo token thất bại!", reply);

    return Response.send(200, {
      message: `Xác thực thành công!`,
      accessToken
    }, reply);
  }
  
  async login(request, reply) {
    if (!request.body || !request.body.username || !request.body.password) 
      return Response.send(401, "Thiếu thông tin", reply);
    
    const { username, password } = request.body;

    const user = await User.findOne({
      where: { username }
    });

    if (!user) return Response.send(400, "Không tìm thấy user", reply);
    
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) return Response.send(401, "Sai mật khẩu", reply);

    const accessToken = await JWT.sign(user.id);
    const refreshToken = await JWT.sign(user.id, true);
    if(!accessToken || !refreshToken) return Response.send(401, "Tạo token thất bại!", reply);

    return Response.send(200, {
      message: `Người dùng <${user.username}> xác thực thành công!`,
      accessToken,
      refreshToken
    }, reply);
  }

  async register(request, reply) {
    if (!request.body || (request.body && (!request.body.username || !request.body.password, !request.body.fullname, !request.body.dob))) 
      return Response.send(401, "Thiếu thông tin", reply);
    
    let { username, password, fullname, dob } = request.body;

    try {
      let user = await User.findOne({
        where: { username }
      });
      
      if (user) return Response.send(401, "User đã tồn tại", reply);

      password = bcrypt.hashSync(password, parseInt(process.env.HASH_ROUND));

      user = await User.create({
        username, password
      });

      await Profile.create({
        UserId: user.id,
        full_name: fullname,
        dob
      });

      const accessToken = await JWT.sign(user.id);
      const refreshToken = await JWT.sign(user.id, true);
      if(!accessToken || !refreshToken) return Response.send(401, "Tạo token thất bại!", reply);

      return Response.send(200, {
        message: `Người dùng <${user.username}> đã được tạo thành công!`,
        accessToken,
        refreshToken
      }, reply);
    } catch (error) {
      console.log(error)
      return Response.send(500, `Lỗi không xác định`, reply);
    }
  }
}

exports.AuthController = new AuthController();