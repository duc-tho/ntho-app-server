'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TiktokHistory extends Model {
    static associate(models) {
      // define association here
    }
  }
  TiktokHistory.init({
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    wm: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'TiktokHistory',
  });
  return TiktokHistory;
};