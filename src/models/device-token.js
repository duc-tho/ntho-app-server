const { createModel } = require("../core/utils/ModelUtils");
const {DataTypes} = require("sequelize");
const MODEL_NAME = 'DeviceToken';

const attributes = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  user_id: {
    allowNull: false,
    type: DataTypes.UUID,
  },
  token: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}

const relations = (db) => {
  const { DeviceToken, User } = db;
  
  DeviceToken.belongsTo(User);
}

exports.MODEL_NAME = MODEL_NAME;
module.exports = createModel(MODEL_NAME, attributes, relations);