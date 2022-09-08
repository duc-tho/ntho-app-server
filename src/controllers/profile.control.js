const { Response } = require("../core/response");
const { models: { Profile, Status, ChangeLog } } = require('../core/database');

class ProfileController {
  async get(request, response) {
    const UserId = request?.body?.userId ?? request.data.userId;

    let profile = await Profile.findOne({
      where: { UserId },
      include: [
        {
          model: Status,
          required: true,
          attributes: ['created_at', 'updated_at'],
          where: {
            deleted_at: null
          },
        },
        {
          model: ChangeLog,
          attributes: [ 'created_at', 'created_by', 'data'],
          required: true,
          nest: true
        },
      ]
    });

    if (profile) return Response.send(200, profile, response);

    return Response.send(404, 'Không tìm được hồ sơ người dùng!', response);
  }

  async update(request, response) {
    const UserId = request.data.userId;

    let profile = await Profile.findOne({
      where: { UserId },
      include: [
        {
          model: Status,
          required: true,
          where: {
            deleted_at: null
          },
        },
      ]
    });

    if (!profile) return Response.send(404, 'Không tìm được hồ sơ người dùng!', response);

    await profile.update({
      full_name: request?.body?.full_name ?? profile['full_name'],
      dob: request?.body?.dob ?? profile['dob'],
      email: request?.body?.email ?? profile['email'],
      phone: request?.body?.phone ?? profile['phone'],
      gender: request?.body?.gender ?? profile['gender'],
      address: request?.body?.address ?? profile['address'],
      favorite: request?.body?.favorite ?? profile['favorite'],
      height: request?.body?.height ?? profile['height'],
      weight: request?.body?.weight ?? profile['weight'],
      social: request?.body?.social ?? profile['social'],
    });
    
    await profile.save();

    return Response.send(200, profile, response);
  }
}

exports.ProfileController = new ProfileController();