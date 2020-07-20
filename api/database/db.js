const Sequelize = require('sequelize');
const dataBase = require('../../config');
const sequelize  = new Sequelize(`mysql://${dataBase.username}:${dataBase.password}@${dataBase.host}:${dataBase.port}/${dataBase.dataBase}`)

module.exports = sequelize;

