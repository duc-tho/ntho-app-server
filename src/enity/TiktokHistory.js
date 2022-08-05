const { DataTypes } = require('sequelize');

exports.TiktokHistoryEntity = {
  NAME: 'TiktokHistory',
  
  FIELDS: {
    
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true
    },
    
    title: {
      type: DataTypes.string,
      allowNull: false,
      defaultValue: 'Không có tiêu đề.'
    },
    
    url: {
      type: DataTypes.string,
      allowNull: false
    },
    
    wm: {
      type: DataTypes.string,
      allowNull: false
    },
  
    nwm: {
      type: DataTypes.string,
      allowNull: false
    }
    
  },
  
  OPTIONS: {}
}