'use strict';

const { sequelize } = require("../database");

const createModel = (modelName, attributes, relations = (models) => {}) => {
  let model = sequelize.define(
    modelName, attributes,
    {
      sequelize,
      modelName: modelName,
      underscored: true,
      timestamps: false
    }
  );
  
  model.associate = relations;
  
  model.prototype.getModelName = function () {
    return modelName;
  };

  return model;
}

exports.createModel = createModel;