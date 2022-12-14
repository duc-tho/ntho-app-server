'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const models = {};

let sequelize;
if (config.use_env_variable) sequelize = new Sequelize(process.env[config.use_env_variable], config);
else sequelize = new Sequelize(config);

exports.sequelize = sequelize;
exports.models = models; 