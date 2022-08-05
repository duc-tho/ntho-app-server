'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TiktokHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TiktokHistory.init({
    id: DataTypes.UUID,
    title: DataTypes.STRING,
    nwm: DataTypes.STRING,
    wm: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TiktokHistory',
  });
  return TiktokHistory;
};