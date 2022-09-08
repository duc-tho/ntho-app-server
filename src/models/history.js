'use strict';
const { DataTypes } = require("sequelize");
const { createModel } = require("../core/utils/ModelUtils");
const MODEL_NAME = 'History';

const attributes = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}

const relations = (models) => {
  const { User, History } = models;

  History.belongsTo(User);
}

exports.MODEL_NAME = MODEL_NAME;
module.exports = createModel(MODEL_NAME, attributes, relations);