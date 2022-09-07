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
  const { User, History, DeviceToken, Profile, Note, TimeTable } = models;
  
  User.hasMany(History);
  User.hasMany(DeviceToken);
  User.hasMany(Note);
  User.hasMany(TimeTable);
  User.hasOne(Profile);
}

exports.MODEL_NAME = MODEL_NAME;
module.exports = createModel(MODEL_NAME, attributes, relations);