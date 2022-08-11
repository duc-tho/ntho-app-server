'use strict';

const { sequelize } = require("../database");
const {DataTypes} = require("sequelize");

const createModel = (modelName, attributes, relations = (models) => {}) => {
  let model = sequelize.define(
    modelName, 
    {
      ...attributes,
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }, 
    {
      sequelize,
      modelName: modelName,
      paranoid: true,
    }
  );
  
  model.associate = relations;
  
  return model;
}

exports.createModel = createModel;