const { createModel } = require("../core/utils/ModelUtils");
const {DataTypes} = require("sequelize");
const MODEL_NAME = 'PushToken';

const attributes = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  token: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}

const relations = (db) => {
  const { PushToken, User } = db;
  
  PushToken.belongsTo(User);
}

exports.MODEL_NAME = MODEL_NAME;
module.exports = createModel(MODEL_NAME, attributes, relations);