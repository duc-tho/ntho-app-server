const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../core/db');

const TiktokHistoryEntity = {
  NAME: 'TiktokHistory',
  
  FIELDS: {
    
    ID: {
      type: DataTypes.UUIDV4,
      primaryKey: true
    },
    
    
    
  },
  
  OPTIONS: {}
}