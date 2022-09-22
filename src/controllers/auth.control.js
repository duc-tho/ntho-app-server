const { Response } = require("../core/response");
const bcrypt = require("bcrypt");
const { models: { User, Profile } } = require("../core/database");
const { JWT } = require("../core/jwt");
const { STATUS_CODE } = require("../core/constants/Code");

class AuthController {
  async refresh(request, reply) {
    if (!request.body || !request.body.refreshToken)
      return Response.send(STATUS_CODE.BAD_REQUEST, "Thiếu thông tin", reply);

    const { refreshToken } = request.body;

    let decoded = await JWT.verify(refreshToken, true);
    if (!decoded) return Response.send(STATUS_CODE.UN_AUTHORIZED, "Refresh token không hợp lệ", reply);

    const accessToken = await JWT.sign(decoded.userId);
    if (!accessToken) return Response.send(STATUS_CODE.UN_AUTHORIZED, "Tạo token thất bại!", reply);

    return Response.send(STATUS_CODE.OK, `Xác thực thành công!`, reply, { accessToken });
  }

  async validate(request, reply) {
    if (!request.body || !request.body.accessToken)
      return Response.send(STATUS_CODE.UN_AUTHORIZED, "Không có access token", reply);

    const { accessToken } = request.body;

    let decoded = null;
    
    try {
      decoded = await JWT.verify(accessToken);
    } catch (error) {}
    
    if (!decoded) return Response.send(STATUS_CODE.UN_AUTHORIZED, "Access token không hợp lệ", reply);

    return Response.send(STATUS_CODE.OK, "Xác thực thành công!", reply);
  }

  async login(request, reply) {
    if (!request.body || !request.body.username || !request.body.password)
      return Response.send(STATUS_CODE.UN_AUTHORIZED, "Thiếu thông tin", reply);

    const { username, password } = request.body;

    const user = await User.findOne({
      where: { username }
    });

    if (!user) return Response.send(STATUS_CODE.NOT_FOUND, "Không tìm thấy user", reply);

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) return Response.send(STATUS_CODE.UN_AUTHORIZED, "Sai mật khẩu", reply);

    const accessToken = await JWT.sign(user.id);
    const refreshToken = await JWT.sign(user.id, true);
    if (!accessToken || !refreshToken) return Response.send(STATUS_CODE.UN_AUTHORIZED, "Tạo token thất bại!", reply);

    return Response.send(STATUS_CODE.OK, `Người dùng <${user.username}> xác thực thành công!`, reply, { accessToken, refreshToken });
  }

  async register(request, reply) {
    if (!request.body || (request.body && (!request.body.username || !request.body.password, !request.body.fullname, !request.body.dob)))
      return Response.send(STATUS_CODE.UN_AUTHORIZED, "Thiếu thông tin", reply);

    let { username, password, fullname, dob } = request.body;

    try {
      let user = await User.findOne({
        where: { username }
      });

      if (user) return Response.send(STATUS_CODE.UN_AUTHORIZED, "User đã tồn tại", reply);

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
      if (!accessToken || !refreshToken) return Response.send(STATUS_CODE.UN_AUTHORIZED, "Tạo token thất bại!", reply);

      return Response.send(STATUS_CODE.OK, `Người dùng <${user.username}> đã được tạo thành công!`, reply, {
        accessToken,
        refreshToken
      });
    } catch (error) {
      console.log(error)
      return Response.send(STATUS_CODE.SERVER_ERROR, `Lỗi không xác định`, reply);
    }
  }
}

exports.AuthController = new AuthController();