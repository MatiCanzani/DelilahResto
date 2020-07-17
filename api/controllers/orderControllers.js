const bcrypt = require('bcrypt');
const sequelize = require('../database/db')
const jwt = require('jsonwebtoken');
const safe = require('../JWT/JWTconfig.js');
const userInfo = require('./userController.js');

const userData = async () => {
    const user  = await userInfo.getUserByToken();
    return user;
}; 



module.exports =  { userData };
