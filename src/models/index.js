'use strict';

const fs = require('fs');
const moment = require('moment/moment');
const path = require('path');
const { DataTypes } = require('sequelize');
const { models, sequelize } = require('../core/database');
const { getUTCTimeForDB } = require('../core/utils/time');
const basename = path.basename(__filename);
const ChangeLog = require('./change_log');
const Status = require('./status');

fs.readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    models[model.name] = model;
  });

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);

    if (modelName !== ChangeLog.name || modelName !== Status.name) {
      models[modelName].hasMany(models[ChangeLog.name], { foreignKey: 'row_id' });
      models[modelName].hasOne(models[Status.name], { foreignKey: 'row_id' });
    }
  }
});

Object.keys(models).forEach(modelName => {
    models[modelName].afterCreate(async (instance) => {
      if (instance instanceof models[ChangeLog.name]) return;
      if (instance instanceof models[Status.name]) return;

      const instanceInfo = {
        row_id: instance.id,
        table: instance.getModelName(),
      };

      const instanceChangeLog = await models[ChangeLog.name].create({
        ...instanceInfo,
        data: JSON.stringify({
          mode: 'create',
          ...instance.dataValues
        })
      });

      const instanceStatus = await models[Status.name].create(instanceInfo);

      instanceChangeLog.save();
      instanceStatus.save();
    }); 

    models[modelName].afterUpdate(async (instance) => {
      if (instance instanceof models[ChangeLog.name]) return;
      if (instance instanceof models[Status.name]) return;
      console.log(instance);
      const instanceInfo = {
        row_id: instance.id,
        table: instance.getModelName(),
      };

      const instanceChangeLog = await models[ChangeLog.name].create({
        ...instanceInfo,
        data: JSON.stringify({
          mode: 'update',
          from: {
            ...instance.dataValues
          },
          to: {
            ...instance._previousDataValues,
          }
        })
      });

      const instanceStatus = await models[Status.name].findOne({
        where: instanceInfo
      });

      instanceStatus.updated_at = sequelize.fn('DATETIME')

      instanceChangeLog.save();
      instanceStatus.save();
    }); 
});

