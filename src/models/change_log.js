const { DataTypes } = require("sequelize");
const { createModel } = require("../core/utils/ModelUtils");
const MODEL_NAME = 'ChangeLog';

const attributes = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  row_id: {
    allowNull: false,
    type: DataTypes.UUID,
  },
  table: {
    allowNull: false,
    type: DataTypes.STRING(20),
  },
  data: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  created_at: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  created_by: {
    allowNull: true,
    type: DataTypes.UUID
  }
}

const relations = (models) => {
  const { ChangeLog, User, History, DeviceToken, Note, TimeTable } = models;

  ChangeLog.belongsTo(History, { foreignKey: 'row_id' });
  ChangeLog.belongsTo(DeviceToken, { foreignKey: 'row_id' });
  ChangeLog.belongsTo(User, { foreignKey: 'row_id' });
  ChangeLog.belongsTo(Note, { foreignKey: 'row_id' });
  ChangeLog.belongsTo(TimeTable, { foreignKey: 'row_id' });
}

exports.MODEL_NAME = MODEL_NAME;
module.exports = createModel(MODEL_NAME, attributes, relations);