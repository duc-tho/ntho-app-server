const { Response } = require("../core/response");
const { models: { Note, Status, ChangeLog } } = require('../core/database');
const { STATUS_CODE } = require("../core/constants/Code");

class NoteController {
  async get(request, response) {
    const NoteId = request?.params?.id;
    
    let note = await Note.findOne({
      where: { id: NoteId },
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
          attributes: ['created_at', 'created_by', 'data'],
          required: true,
          nest: true
        },
      ]
    });

    if (note) return Response.send(STATUS_CODE.OK, null, response, note);

    return Response.send(STATUS_CODE.NOT_FOUND, 'Không tìm được ghi chú!', response);
  }

  async getAll(request, response) {
    let notes = await Note.findAll({
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
          attributes: ['created_at', 'created_by', 'data'],
          required: true,
          nest: true
        },
      ]
    });

    if (notes) return Response.send(STATUS_CODE.OK, null, response, notes);

    return Response.send(STATUS_CODE.NOT_FOUND, 'Không tìm được ghi chú nào!', response);
  }

  async create(request, response) {
    let note = await Note.create({
      user_id: request?.data?.userId,
      title: request?.body?.title ?? null,
      mood: request?.body?.mood ?? null,
      content: request?.body?.content ?? null,
      time: request?.body?.time ?? null,
      audio: request?.body?.audio ?? null,
      image: request?.body?.image ?? null,
      background: request?.body?.background ?? null,
      pin: !!request?.body?.pin,
    });

    return Response.send(STATUS_CODE.OK, null, response, note);
  }

  async update(request, response) {
    const NoteId = request?.body?.noteId;

    let note = await Note.findOne({
      where: {
        id: NoteId
      },
      include: [
        {
          model: Status,
          required: true,
          attributes: ['created_at', 'updated_at'],
          where: {
            deleted_at: null
          },
        },
      ]
    });

    if (!note) return Response.send(STATUS_CODE.NOT_FOUND, 'Không tìm được ghi chú!', response);

    await note.update({
      title: request?.body?.title ?? note['title'],
      mood: request?.body?.mood ?? note['mood'],
      content: request?.body?.content ?? note['content'],
      time: request?.body?.time ?? note['time'],
      audio: request?.body?.audio ?? note['audio'],
      image: request?.body?.image ?? note['image'],
      background: request?.body?.background ?? note['background'],
      pin: request?.body?.pin ?? note['pin'],
    });

    await note.save();

    return Response.send(STATUS_CODE.OK, null, response, note);
  }
}

exports.NoteController = new NoteController();