const { Response } = require("../core/response");
const { models: { Note, Status, ChangeLog } } = require('../core/database');

class NoteController {
  async get(request, response) {
    const NoteId = request?.params?.id;

    console.log(request.params);

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
          attributes: [ 'created_at', 'created_by', 'data'],
          required: true,
          nest: true
        },
      ]
    });

    if (note) return Response.send(200, note, response);

    return Response.send(404, 'Không tìm được ghi chú!', response);
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
          attributes: [ 'created_at', 'created_by', 'data'],
          required: true,
          nest: true
        },
      ]
    });

    if (notes) return Response.send(200, notes, response);

    return Response.send(404, 'Không tìm được ghi chú nào!', response);
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

    return Response.send(200, note, response);
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
          where: {
            deleted_at: null
          },
        },
      ]
    });

    if (!note) return Response.send(404, 'Không tìm được ghi chú!', response);

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

    return Response.send(200, note, response);
  }
}

exports.NoteController = new NoteController();