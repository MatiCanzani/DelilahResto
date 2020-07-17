const Sequelize = require('sequelize');
const dataBase = require('../../config');
const sequelize  = new Sequelize(`mysql://${dataBase.username}:${dataBase.password}@${dataBase.host}/${dataBase.dataBase}`)
//mysql://bf8e43b66ab68c:52791f02@us-cdbr-east-02.cleardb.com/heroku_87e325f58fecdec
module.exports = sequelize;

