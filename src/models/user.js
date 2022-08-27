const { DataTypes } = require("sequelize");
const { createModel } = require("../core/utils/ModelUtils");
const MODEL_NAME = 'User';

const attributes = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  username: {
    unique: true,
    allowNull: false,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.TEXT,
  }
}

const relations = (models) => {
  const { User, TiktokHistory, DeviceToken, Profile } = models;
  
  User.hasMany(TiktokHistory);
  User.hasMany(DeviceToken);
  User.hasOne(Profile);
}

exports.MODEL_NAME = MODEL_NAME;
module.exports = createModel(MODEL_NAME, attributes, relations);