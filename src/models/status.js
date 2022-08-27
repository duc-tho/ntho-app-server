const { DataTypes } = require("sequelize");
const { createModel } = require("../core/utils/ModelUtils");
const MODEL_NAME = 'Status';

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
  created_at: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  deleted_at: {
    allowNull: true,
    type: DataTypes.DATE
  }
}

const relations = (models) => {
  const { User, TiktokHistory, DeviceToken, Note, TimeTable, Status } = models;
  
  Status.belongsTo(TiktokHistory, { foreignKey: 'row_id' });
  Status.belongsTo(DeviceToken, { foreignKey: 'row_id' });
  Status.belongsTo(User, { foreignKey: 'row_id' });
  Status.belongsTo(Note, { foreignKey: 'row_id' });
  Status.belongsTo(TimeTable, { foreignKey: 'row_id' });
}

exports.MODEL_NAME = MODEL_NAME;
module.exports = createModel(MODEL_NAME, attributes, relations);