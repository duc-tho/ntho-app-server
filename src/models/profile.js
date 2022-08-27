const { DataTypes } = require("sequelize");
const { createModel } = require("../core/utils/ModelUtils");
const MODEL_NAME = 'Profile';

const attributes = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  full_name: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: "Chưa đặt tên nè"
  },
  dob: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  email: {
    type: DataTypes.TEXT,
  },
  phone: {
    type: DataTypes.TEXT
  },
  gender: {
    type: DataTypes.BOOLEAN
  },
  address: {
    type: DataTypes.TEXT
  },
  favorite: {
    type: DataTypes.TEXT
  },
  height: {
    type: DataTypes.REAL
  },
  weight: {
    type: DataTypes.REAL
  },
  social: {
    type: DataTypes.TEXT
  }
}

const relations = (models) => {
  const { User, Profile } = models;
  
  Profile.belongsTo(User);
}

exports.MODEL_NAME = MODEL_NAME;
module.exports = createModel(MODEL_NAME, attributes, relations);
