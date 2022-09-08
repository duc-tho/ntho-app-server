const { DataTypes } = require("sequelize");
const { createModel } = require("../core/utils/ModelUtils");
const MODEL_NAME = 'TimeTable';

const attributes = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  data: {
    allowNull: false,
    type: DataTypes.TEXT
  }
}

const relations = (models) => {
  const { User, TimeTable } = models;

  TimeTable.belongsTo(User);
}

exports.MODEL_NAME = MODEL_NAME;
module.exports = createModel(MODEL_NAME, attributes, relations);