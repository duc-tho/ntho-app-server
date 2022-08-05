const { TiktokHistoryEntity } = require('./TiktokHistory.js');
const { Sequelize } = require('sequelize');

const db = new Sequelize({
  dialect: "sqlite",
  storage: '/app/src/data/ntho.db'
});

const Entities = [
  TiktokHistoryEntity
];

Entities.forEach(({ NAME, FIELDS, OPTIONS }) => {
  db.define(NAME, FIELDS, OPTIONS);
});

exports.db = db;