"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TiktokHistory extends Model {
    static associate(models) {
      // define association here
    }
  }
  TiktokHistory.init(
    {
      id: DataTypes.UUID,
      title: DataTypes.STRING,
      nwm: DataTypes.STRING,
      wm: DataTypes.STRING,
      url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TiktokHistory",
    }
  );
  return TiktokHistory;
};
