const Sequelize = require('sequelize');
const dataBase = require('../../config');
const sequelize  = new Sequelize(`mysql://${dataBase.username}:${dataBase.password}@${dataBase.host}:${dataBase.port}/${dataBase.dataBase}`)
//const sequelize = new Sequelize ('mysql://root:root@localhost:8889/Delilah_Resto')
module.exports = sequelize;
