const { TiktokHistoryEntity } = require('./TiktokHistory.js');
const { Sequelize } = require('sequelize');

const db = new Sequelize({
  dialect: "sqlite",
  storage: '/app/src/data/ntho.db'
});

const Entities = [
  TiktokHistoryEntity
];

Entities.forEach((entity) => {
  const { NAME, FIELDS, OPTIONS } = entity;
  
  entity = db.define(NAME, FIELDS, OPTIONS);
});

console.log(db.models.TiktokHistory);

exports.db = db;