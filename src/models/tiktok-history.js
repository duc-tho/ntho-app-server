'use strict';
const { DataTypes } = require("sequelize");
const { createModel } = require("../core/utils/ModelUtils");
const MODEL_NAME = 'TiktokHistory';

const attributes = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'Không có tiêu đề.'
  },
  nwm: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  wm: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}

const relations = (models) => {
  let { User, TiktokHistory } = models;
   
  TiktokHistory.belongsTo(User);
} 

exports.MODEL_NAME = MODEL_NAME;
module.exports = createModel(MODEL_NAME, attributes, relations);