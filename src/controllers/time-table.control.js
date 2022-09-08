const { Response } = require("../core/response");
const { models: { TimeTable, Status, ChangeLog } } = require('../core/database');

class TimeTableController {
  async get(request, response) {
    const TimeTableId = request?.params?.id;

    console.log(request.params);

    let timeTable = await TimeTable.findOne({
      where: { id: TimeTableId },
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

    if (timeTable) return Response.send(200, timeTable, response);

    return Response.send(404, 'Không tìm được thời khóa biểu!', response);
  }

  async getAll(request, response) {
    let timeTables = await TimeTable.findAll({
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

    if (timeTables) return Response.send(200, timeTables, response);

    return Response.send(404, 'Không tìm được thời khóa biểu nào!', response);
  }

  async create(request, response) {
    let timeTable = await TimeTable.create({
      UserId: request?.data?.userId,
      data: request.body.data
    });

    return Response.send(200, timeTable, response);
  }

  async update(request, response) {
    const TimeTableId = request?.body?.timeTableId;

    let timeTable = await TimeTable.findOne({
      where: {
        id: TimeTableId
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

    if (!timeTable) return Response.send(404, 'Không tìm được thời khóa biểu!', response);

    await timeTable.update({
      title: request?.body?.title ?? timeTable['title'],
      data: request?.body?.data ?? timeTable['data'],
    });

    await timeTable.save();

    return Response.send(200, timeTable, response);
  }
}

exports.TimeTableController = new TimeTableController();