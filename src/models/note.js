const { DataTypes } = require("sequelize");
const { createModel } = require("../core/utils/ModelUtils");
const MODEL_NAME = 'Note';

const attributes = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  user_id: {
    allowNull: false,
    type: DataTypes.UUID,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  mood: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT
  },
  time: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  audio: {
    type: DataTypes.TEXT
  },
  image: {
    type: DataTypes.TEXT
  },
  background: {
    type: DataTypes.TEXT
  },
  pin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
}

const relations = (models) => {
  const { User, Note } = models;
  
  Note.belongsTo(User);
}

exports.MODEL_NAME = MODEL_NAME;
module.exports = createModel(MODEL_NAME, attributes, relations);