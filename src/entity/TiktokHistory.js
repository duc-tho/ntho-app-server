const { DataTypes } = require('sequelize');

exports.TiktokHistoryEntity = {
  NAME: 'TiktokHistory',
  
  FIELDS: {
    
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true
    },
    
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Không có tiêu đề.'
    },
    
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    
    wm: {
      type: DataTypes.STRING,
      allowNull: false
    },
  
    nwm: {
      type: DataTypes.STRING,
      allowNull: false
    }
    
  },
  
  OPTIONS: {}
}